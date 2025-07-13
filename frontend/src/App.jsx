import React from 'react'
import { Routes, Route } from "react-router"
import LandingPage from "./pages/LandingPage"
import Navbar from './Nav/Navbar'
import UploadResume from './pages/UploadResume'
import ImproveResume from './pages/ImproveResume'
import ResumeScore from './pages/ResumeScore'
import SignUp from './pages/SignUp'
const App = () => {
  return(
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
            <Route path="/" element={<Navbar/>}>
               <Route path="upload" element={<UploadResume/>} />
                <Route path="score" element={<ResumeScore/>} />
                 <Route path="improve" element={<ImproveResume/>} />
                 <Route path="signup" element={<SignUp/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App