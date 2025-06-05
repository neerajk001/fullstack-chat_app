import React from 'react'
// import './App.css'
import {Route,Routes} from 'react-router-dom'
import { useEffect } from 'react'
import LandingPage from './components/LandingPage.jsx'
import cors from 'cors'
import { Navigate } from 'react-router-dom'
import  {Toaster} from 'react-hot-toast'
import Navbar from './components/Navbar.jsx'
import LoginPage from '../src/pages/LoginPage.jsx'
import SignUpPage from '../src/pages/SignUpPage.jsx'
import HomePage from '../src/pages/HomePage.jsx'
import SettingPage from '../src/pages/SettingPage.jsx'
import ProfilePage from '../src/pages/ProfilePage.jsx'
import { userAuthSore } from './store/userAuthStore.js'

function App() {
  const {authUser,checkAuth} =userAuthSore()
  // console.log("onlineUsers",onlineUsers)

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  

  return (
    <div >
  <Navbar />
  <Routes>
    {/* <Route path="/landing" element={authUser ? <LandingPage/>} /> */}
    <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
    <Route path='/signup' element={!authUser ? <SignUpPage/>:<Navigate to='/'/>} />
    <Route path='/login' element={!authUser ? <LoginPage/>: <Navigate to='/'/>} />
    <Route path='/settings' element={<SettingPage/>} />
    <Route path='/profile' element={<ProfilePage/>} />
  </Routes>
  <Toaster/>
    </div>
    
  )
}

export default App