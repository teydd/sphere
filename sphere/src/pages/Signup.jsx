import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  const { signup, error,isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = form;
    try {
      const success = await signup(email, password, name);
if (success) navigate("/verify");
    } catch (error) {
      console.log(error);
    }
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
      <div className="container mt-5 col-sm-6 col-md-6 col-lg-4 form rounded-5">
        <div className=" text-center">
          <Link
            className="text-decoration-none text-black lead fw-bold"
            to={"/"}
          >
            Sphere
          </Link>
        </div>
        <p className="text-center pt-3">Sign up to continue with</p>
        <Link className="btn btn-outline-light w-100" to={"/google"}>
          Google
        </Link>
        <p className="text-center">or</p>
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
            type="name"
            name="name"
            value={form.name}
            onChange={handleOnchange}
            placeholder="Name"
          />
          <br />
          <input
            className="form-control"
            type="password"
            name="password"
            value={form.password}
            onChange={handleOnchange}
            placeholder="Password"
          />
          {error && <p className="text-black">{error}</p>}
          <hr />
          <button className="btn btn-outline-dark w-100" disabled={isLoading}>
  {isLoading ? "Creating account..." : "Submit"}
</button>

          <hr />
          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-black text-decoration-none" to={"/signin"}>
              signin
            </Link>
          </p>
        </form>
        <br />
      </div>
    </>
  );
}
