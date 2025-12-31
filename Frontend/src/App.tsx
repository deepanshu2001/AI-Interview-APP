import './App.css'
import LoginPage from './Components/Login'
import { Route, Routes } from 'react-router-dom'
import { RegisterPage } from './Pages/RegisterPage'
import { DashboardPage } from './Pages/DashboardPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DSARoundPage } from './Pages/DSARoundPage'



function App() {
  
 return (
  <>
  <AuthProvider>
    <Routes>
    
      <Route path='/dashboard' element={<DashboardPage/>}/>
    <Route path='/' element={<LoginPage/>}/>
    
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path="/dashboard/dsa" element={<DSARoundPage/>}/>
  </Routes>
  </AuthProvider>
  
  </>
 )
}

export default App
