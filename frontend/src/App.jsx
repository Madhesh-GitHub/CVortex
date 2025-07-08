import React from 'react'
import { Routes, Route } from "react-router"
import LandingPage from "./pages/LandingPage"

const App = () => {
  return(
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
    </>
  )
}

export default App