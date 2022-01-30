import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import { Context } from './index'

import './App.css'

const App = () => {
  const { auth } = useContext(Context)
  
  // eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth)
  // console.log(user)
  // console.log(error)

  if (loading) return <Loader />

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
