import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { safeLogger } from "../../utils/safelogger";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const {signin,isLoading,error} = useAuthStore()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const {email,password} = form
    const success = await signin(email,password)
    if(success){
      navigate("/")
    }
    safeLogger("Form submitted:", form);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="container bg-whit mt-5 col-sm-6 col-md-6 col-lg-4 form rounded-5">
        <div className=" text-center">
          <Link
            className="text-decoration-none text-black lead fw-bold"
            to={"/"}
          >
            Sphere
          </Link>
        </div>
        <p className="text-center pt-3">Sign in to continue</p>
        <hr />
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="email"
            name="email"
            value={form.email}
            onChange={handleOnchange}
            placeholder="Email"
            autoFocus
          />{" "}
          <br />
          <input
            className="form-control"
            type="password"
            name="password"
            value={form.password}
            onChange={handleOnchange}
            placeholder="Password"
          />
          {error && <p className="text-danger">{error}</p>}
          <br />
          <Link className="nav-link text-center" to={"/forgot-password"}>
            Forgot Password?
          </Link>
          <hr />
          <button className="btn btn-outline-dark w-100" >
  {isLoading ? "Signing in..." : "Sign in"}
</button>

          <hr />
          <p className="text-center">
            Don't have an account?{" "}
            <Link className="text-black text-decoration-none" to={"/signup"}>
              Signup
            </Link>
          </p>
        </form>
        <br />
      </div>
    </>
  );
}
