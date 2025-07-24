import './App.css'
import LandingPage from './Pages/LandingPage'
import TodoPage from './Pages/TodoPage'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import AlertProvider from './Context/AlertProvider'
import IdProvider from './Context/IdProvider'


function App(){
  return (
       <BrowserRouter>
       <AlertProvider>
        <IdProvider>
       <Routes>
        <Route path="/" element = {<LandingPage />} />
        <Route path='login' element = {<Login />} />
        <Route path = 'signup' element = {<Signup />} />
        <Route path = 'todo' element = {<TodoPage />} />
       </Routes>
        </IdProvider>
       </AlertProvider>
       </BrowserRouter>
  )
}

export default App
