import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Nav from "./components/Nav"
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signin' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
      </Routes>
    </Router>      
    </>
  )
}

export default App
