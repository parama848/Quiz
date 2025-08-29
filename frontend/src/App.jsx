import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import StudentDashboard from './components/StudentDashboard'
import TeacherDashboard from './components/TeacherDashboard'
import AddQuestion from './components/AddQuestion'
import Quiz from './components/Quiz'
import StartQuiz from './pages/StartQuiz'
import GenerateAi from './pages/GenerateAi'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/studentdashboard' element={<StudentDashboard />} />
      <Route path='/teacher-dashboard' element={<TeacherDashboard />} />
      <Route path='/addquestions' element={<AddQuestion />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path="/startquiz" element={<StartQuiz />} />
      <Route path="/generate-ai" element={<GenerateAi />} />
    </Routes>
    </>
  )
}

export default App
