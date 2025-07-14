import React from 'react'
import { Routes, Route } from "react-router"
import LandingPage from "./LandingPage"

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