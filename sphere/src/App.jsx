import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Verify from "./pages/Verify";
import {Toaster} from "react-hot-toast"
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { RedirectRoute } from "./components/RedirectRoute";


function App() {
  const {checkAuth,isAuthenticated,user} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log("Authenticated",isAuthenticated)
  console.log("user", user)
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/signin" element={<RedirectRoute><Login></Login></RedirectRoute>}></Route>
          <Route path="/signup" element={<RedirectRoute><Signup></Signup></RedirectRoute>}></Route>
          <Route path="/verify" element={<RedirectRoute><Verify></Verify></RedirectRoute>}></Route>
          <Route
            path="/forgot-password"
            element={<RedirectRoute><ForgotPassword></ForgotPassword></RedirectRoute>}
          ></Route>
          <Route
            path="/reset-password/:token"
            element={<RedirectRoute><ResetPassword></ResetPassword></RedirectRoute>}
          ></Route>
        </Routes>
        <Toaster/>
      </Router>
    </>
  );
}

export default App;
