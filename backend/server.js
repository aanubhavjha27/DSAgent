import express from "express"
import cors from "cors"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import pkg from "@prisma/client"
import dotenv from "dotenv"

dotenv.config()
const {PrismaClient}=pkg

//--init
const app=express();
const prisma=new PrismaClient();
import "dotenv/config"

//--middleware

app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json())

//helpers

const hashedpassword=(password)=>
    bcrypt.hash(password,10)

const verifyPassword=(plain,hashed)=>
    bcrypt.compare(plain,hashed)

const createtoken=(userid)=>
    jwt.sign(
        {sub:userid},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}

    )

const decodeToken=(token)=>{
    try {
        return jwt.verify(token,process.env.JWT_SECRET)
    } catch  {
        return null;
    }
}

//authmiddleware

const requireAuth=async(req,res,next)=>{
    const authHeader=req.headers.authorization

    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({error:"No token provided"})
    }
    const token=authHeader.split(" ")[1];
    const payload=decodeToken(token);

    if(!payload){
        return res.status(401).json({error:"invalid or expired token"})
    }

    const user=await prisma.user.findUnique({
        where:{id:payload.sub},
    })
    if(!user){
        return res.status(401).json({error:"user not found"})
    }
    req.user=user
    next()
}

//routes

//signup
app.post("/auth/signup",async(req,res)=>{
    const {username,email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({error:"email and password required"})
    }
    const existing=await prisma.user.findUnique({
        where:{email},
    })

    if(existing){
        return res.status(400).json({ error: "Email already registered" });
    }

    const hashed=await hashedpassword(password);

  
  const user = await prisma.user.create({             // create user in DB
    data: {
      username,
      email,
      hashedPassword: hashed,                         // never store plain password
      settings: { timerDuration: 10 },                // default 10 min timer
    },
  });

  const token=createtoken(user.id);
   return res.status(201).json({ accessToken: token ,
    username:user.username
   });
})

//login
app.post("/auth/login",async (req,res)=>{
    const { email, password } = req.body;               // destructure request body

  if (!email || !password) {                          // basic validation
    return res.status(400).json({ error: "Email and password required" });
  }

  const user = await prisma.user.findUnique({         // find user by email
    where: { email },
  });

  const valid =
    user && (await verifyPassword(password, user.hashedPassword)); // check password

  if (!valid) {                                       // wrong email or password
    return res.status(401).json({ error: "Invalid email or password" }); // vague on purpose
  }

  const token = createtoken(user.id);                 // generate JWT

  return res.json({ accessToken: token,username:user.username });   
})
// ME (protected route)
app.get("/auth/me", requireAuth, (req, res) => {      // requireAuth runs first
  const { id, email, settings, createdAt } = req.user; // strip out sensitive fields
  return res.json({ id, email, settings, createdAt }); // return safe user data
});



//---------problem lists-------------------------------------//
app.get("/lists", requireAuth, async (req, res) => {
  try {
    const lists = await prisma.list.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { problems: true } }    // count of problems in each list
      }
    })

    // group by category
    const grouped = {
      popular: lists.filter(l => l.category === "popular"),
      company: lists.filter(l => l.category === "company"),
      pattern: lists.filter(l => l.category === "pattern"),
    }

    return res.json(grouped)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to fetch lists" })
  }
})


// get all problems in a specific list
app.get("/lists/:slug/problems", requireAuth, async (req, res) => {
  try {
    const list = await prisma.list.findUnique({
      where: { slug: req.params.slug },           // find list by slug
      include: {
        problems: {
          include: { problem: true }              // join through ProblemList to get Problem data
        }
      }
    })

    if (!list) return res.status(404).json({ error: "List not found" })

    // extract just the problem data from the join table
    const problems = list.problems.map(p => p.problem)

    return res.json({
      id: list.id,
      name: list.name,
      slug: list.slug,
      description: list.description,
      category: list.category,
      totalProblems: problems.length,
      problems
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to fetch problems" })
  }
})

//-----------------------------------------------------//
// ── SESSION ROUTES ────────────────────────────────────────────────────────

// create a new session when user opens a problem
app.post("/sessions", requireAuth, async (req, res) => {
  try {
    const { problemId } = req.body

    // get problem details from DB
    const problem = await prisma.problem.findUnique({
      where: { id: problemId }
    })

    if (!problem) return res.status(404).json({ error: "Problem not found" })

    // create session in DB
    const session = await prisma.session.create({
      data: {
        userId: req.user.id,                           // from requireAuth
        problemId: problem.id,
        hintLevel: 1,                                  // start at hint level 1
        completed: false,
      }
    })

    // call python AI service to explain the problem
    const aiRes = await fetch("http://localhost:8000/hint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problem_name: problem.name,
        problem_link: problem.link,
        code: null,                                    // no code yet, just explain
        hint_level: 1,
      })
    })

    const aiData = await aiRes.json()

    return res.status(201).json({
      session,
      problem,
      firstMessage: aiData.response,                  // AI explanation of problem
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to create session" })
  }
})

// user sends code — get hint
app.post("/sessions/:id/message", requireAuth, async (req, res) => {
  try {
    const { code } = req.body
    const sessionId = req.params.id

    // get session from DB
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { problem: true }                       // include problem data
    })

    if (!session) return res.status(404).json({ error: "Session not found" })
    if (session.userId !== req.user.id) return res.status(403).json({ error: "Unauthorized" })

    // save the attempt to DB
    await prisma.attempt.create({
      data: {
        sessionId: session.id,
        code,                                          // user's pasted code
        hintLevel: session.hintLevel,                  // which hint level they're on
      }
    })

    // call python AI service for hint
    const aiRes = await fetch("http://localhost:8000/hint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problem_name: session.problem.name,
        problem_link: session.problem.link,
        code,
        hint_level: session.hintLevel,
      })
    })

    const aiData = await aiRes.json()

    // increment hint level (max 4 = solution)
    const nextHintLevel = Math.min(session.hintLevel + 1, 4)

    // update session hint level in DB
    await prisma.session.update({
      where: { id: sessionId },
      data: { hintLevel: nextHintLevel }
    })

    return res.json({
      response: aiData.response,                       // hint from AI
      hintLevel: session.hintLevel,                    // current hint level
      nextHintLevel,                                   // next hint level
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to process message" })
  }
})

// get session by id (to restore chat on page reload)
app.get("/sessions/:id", requireAuth, async (req, res) => {
  try {
    const session = await prisma.session.findUnique({
      where: { id: req.params.id },
      include: {
        problem: true,                                 // include problem data
        attempts: true,                                // include all attempts
      }
    })

    if (!session) return res.status(404).json({ error: "Session not found" })
    if (session.userId !== req.user.id) return res.status(403).json({ error: "Unauthorized" })

    return res.json(session)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to fetch session" })
  }
})
//start server
const port=process.env.PORT||3000
app.listen(port,()=>console.log(`server starting on port ${port}`))