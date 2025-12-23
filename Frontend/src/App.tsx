import './App.css'
import LoginPage from './Components/Login'
import { Route, Routes } from 'react-router-dom'
import { RegisterPage } from './Pages/RegisterPage'
import { DashboardPage } from './Pages/DashboardPage'
function App() {
 return (
  <>
  <Routes>
    <Route path='/' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/dashboard' element={<DashboardPage/>}/>
  </Routes>
  </>
 )
}

export default App
