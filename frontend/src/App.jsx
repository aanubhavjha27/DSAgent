import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { Toaster } from 'react-hot-toast'
import Introductionpage from './pages/Introductionpage'
import ProblemsList from './pages/ProblemsList'
import PracticeQuestions from './pages/PracticeQuestions'
import Chat from './pages/Chat'

const ProtectedRoute=({children})=>{
  const token=localStorage.getItem("token")

  return token? children:<Navigate to="/login"/>
}

const App = () => {
  return (
     <BrowserRouter>
     <Toaster position='top-right'/>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

        <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>}/>
         <Route path="/chat" element={
            <ProtectedRoute>
             <Chat/>
              </ProtectedRoute>} />

           <Route path="/practice" element={
            <ProtectedRoute>
             <PracticeQuestions/>
              </ProtectedRoute>} />

              <Route path="/chat/:problemId" element={
                <ProtectedRoute>
                <Chat />
              </ProtectedRoute>} />

        <Route path="/practice/:slug" element={
          <ProtectedRoute>
          <ProblemsList/>
        </ProtectedRoute>} />
          <Route path='*' element={<Introductionpage/>} />

      </Routes>
     </BrowserRouter>
  )
}

export default App