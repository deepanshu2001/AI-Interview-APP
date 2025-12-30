import './App.css'
import LoginPage from './Components/Login'
import { Route, Routes } from 'react-router-dom'
import { RegisterPage } from './Pages/RegisterPage'
import { DashboardPage } from './Pages/DashboardPage'
import { AuthProvider } from './context/AuthContext'
function App() {
 return (
  <>
  <AuthProvider>
    <Routes>
    <Route path='/' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/dashboard' element={<DashboardPage/>}/>
  </Routes>
  </AuthProvider>
  
  </>
 )
}

export default App
