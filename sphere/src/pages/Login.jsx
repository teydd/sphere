import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { safeLogger } from "../../utils/safelogger";
import { toast } from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { signin, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    try {
      await signin(email, password);
      navigate("/");
      toast.success("Log in sucessful");
    } catch (error) {
      console.log(error);
    }
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
            onChange={handleChange}
            placeholder="Email"
            autoFocus
          />{" "}
          <br />
          <input
            className="form-control"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <br />
          {error}
          <Link className="nav-link text-center" to={"/forgot-password"}>
            Forgot Password?
          </Link>
          <hr />
          <button className="btn btn-outline-dark w-100">
            {isLoading ? "Signing in" : "Sign in"}
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
