import React, { use, useState } from "react";

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
          <a className="text-decoration-none text-black lead fw-bold" href="/">
            Sphere
          </a>
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
          <a className="nav-link text-center" href="/forgot-password">
            Forgot Password?
          </a>
          <hr />
          <button className="btn btn-outline-dark w-100">Submit</button>
          <hr />
          <p className="text-center">
            Don't have an account?{" "}
            <a className="text-black text-decoration-none" href="/signup">
              Sign up
            </a>
          </p>
        </form>
        <br />
      </div>
    </>
  );
}
