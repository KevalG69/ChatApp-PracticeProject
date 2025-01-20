import { useState } from 'react'
import {Navigate,Route,Routes} from 'react-router-dom'
//css
import './CSS/App.css'
//components
import Home from './components/Home.jsx'
import Signin from './components/Signin.jsx'
import Signup from './components/Signup.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/signup"/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signin'element={<Signin/>}/>
        <Route path='/signup'element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
