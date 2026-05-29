from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, END
from typing_extensions import TypedDict
import os

load_dotenv()

app=FastAPI(title="DSA AI service")

app.add_middleware(
    CORSMiddleware,
     allow_origins=["*"],                               # allow all origins
    allow_methods=["*"],
    allow_headers=["*"],
)

#--llm setup
llm=ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name=os.getenv("GROQ_MODEL"),
    temperature=0.7
)

#--state

class SessionState(TypedDict):
    problem_name: str                                  # name of the problem e.g. "Two Sum"
    problem_link: str                                  # leetcode link
    code: str                                          # user's pasted code
    hint_level: int                                    # 1, 2, 3, or 4 (solution)
    messages: list                                     # chat history
    response: str 

#--prompts
SYSTEM_PROMPT = """You are a Socratic DSA tutor. Your job is to help students learn Data Structures and Algorithms by guiding them, NOT by giving them the answer directly.

STRICT RULES:
- NEVER give the complete solution or working code
- NEVER write the algorithm step by step in a way that makes the solution obvious
- ALWAYS ask leading questions that make the student think
- Be encouraging and supportive
- Keep hints concise — 3 to 5 sentences max
- Focus on the conceptual gap in the student's approach
"""

def get_hint_prompt(problem_name: str, code: str, hint_level: int) -> str:
    """builds the prompt based on hint level"""

    base = f"""
    Problem: {problem_name}

    Student's code:
    {code}

    """

    if hint_level == 1:                                # first hint — very gentle nudge
        return base + """
This is the student's FIRST attempt. Give a very gentle hint.
- Point out the general approach or data structure they should think about
- Do NOT mention specific algorithms
- Ask one leading question like "What if you thought about this differently?"
- Do NOT give any code
"""

    elif hint_level == 2:                              # second hint — more specific
        return base + """
This is the student's SECOND attempt. Give a more specific hint.
- Point out specifically what is wrong with their current approach
- Mention the data structure or technique they should use (e.g. "Think about hash maps")
- Still do NOT give the actual implementation
- Ask a leading question about their specific mistake
"""

    elif hint_level == 3:                              # third hint — almost there
        return base + """
This is the student's THIRD attempt. Give a very specific hint.
- Tell them exactly what concept they are missing
- You can describe the algorithm in plain English but NOT in code
- Say something like "You're very close, the key insight is..."
- Do NOT write any actual code
"""

    else:                                              # hint level 4 — give solution
        return base + """
The student has tried 3 times. Now give them the complete solution.
- Explain the full approach clearly
- Write the working code
- Explain why their original approach was wrong
- Explain time and space complexity
"""

def get_explanation_prompt(problem_name: str, problem_link: str) -> str:
    """prompt to explain the problem when session starts"""
    return f"""
Problem: {problem_name}
LeetCode Link: {problem_link}

Explain this problem to the student clearly:
1. What the problem is asking in simple terms
2. What the input and output look like with an example
3. What constraints or edge cases to keep in mind
4. End with: "Now go attempt this on LeetCode and paste your code here when you're ready!"

Do NOT give any hints or solution. Just explain the problem clearly.
Keep it concise — under 150 words.
"""

#nodes

def explain_problem(state:SessionState)->SessionState:
    """called when the session first starts-explains the problem"""
    prompt=get_explanation_prompt(
        state['problem_name'],
        state['problem_link']
    )
    response=llm.invoke([
        {"role":"system","content":SYSTEM_PROMPT},
        {"role":"user","content":prompt}
    ])
    state['response']=response.content
    return state

def give_hint(state:SessionState)->SessionState:
    """called when the user pastes code -gives hint based on the level"""
    prompt=get_hint_prompt(
         state["problem_name"],
        state["code"],
        state["hint_level"]
    )
    response = llm.invoke([
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": prompt}
    ])
    state['response']=response.content
    return state

def route(state:SessionState)->str:
    """decides which node to run based on state"""

    if not state.get("code"):
        return "explain"
    else:
        return "hint"

#--build graph

builder=StateGraph(SessionState)

builder.add_node("explain",explain_problem)
builder.add_node("hint",give_hint)

builder.set_conditional_entry_point(route)

builder.add_edge("explain",END)
builder.add_edge("hint",END)

graph=builder.compile()

#--request/response schemas

class HintRequest(BaseModel):
    problem_name:str
    problem_link:str
    code:Optional[str]=None
    hint_level:int=1

class HintResponse(BaseModel):
    response:str
    hint_level:int

#--routes

@app.post("/hint",response_model=HintResponse)
async def get_hint(body:HintRequest):
     """
    main endpoint — called by express backend
    either explains the problem (first message)
    or gives a hint based on hint_level (subsequent messages)
    """
     state: SessionState = {
        "problem_name": body.problem_name,
        "problem_link": body.problem_link,
        "code": body.code or "",
        "hint_level": body.hint_level,
        "messages": [],
        "response": ""} 
     
     result=graph.invoke(state)
     return HintResponse(
         response=result['response'],
         hint_level=body.hint_level
     )

@app.get("/health")
def health():
    return {"status":"ok"}