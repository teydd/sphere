import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted", form);
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
          <br />
          <Link className="nav-link text-center" to={"/forgot-password"}>
            Forgot Password?
          </Link>
          <hr />
          <button className="btn btn-outline-dark w-100">Submit</button>
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
