import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Nav from "./components/Nav"
import Home from './pages/Home';
import Login from './pages/Login';
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes>
    </Router>      
    </>
  )
}

export default App
