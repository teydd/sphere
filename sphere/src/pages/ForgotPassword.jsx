import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
  });
  const [issubmitted, setisSubmitted] = useState(false);

  const { forgot, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = form;
    try {
      await forgot(email);
      setisSubmitted(true);
      toast.success("Link sent successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="container bg-whit mt-5 col-sm-6 col-md-6 col-lg-4 form rounded-5">
      {!issubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className=" text-center">
            <Link
              className="text-decoration-none text-black lead fw-bold"
              to={"/"}
            >
              Sphere
            </Link>
          </div>
          <p className="text-center">Enter your email</p>
          <input
            className="form-control"
            type="email"
            name="email"
            value={form.email}
            onChange={handleOnchange}
            placeholder="Email"
            autoFocus
          />{" "}
          <hr />
          {<p>{error}</p>}
          <button className="btn btn-outline-dark w-100">{isLoading? "Submitting" : "Submit"}</button>
          <hr />
        </form>
      ) : (
        <div className="text-center container col-6 rounded-4">
          <div className="card-header h4">Forgot Password</div>
          <hr />
          <p className="card-text">
            If an account exists for {form.email}, you will receive a password
            reset link shortly
          </p>
          <hr />
          <Link to={"/signin"} className="btn btn-primary">
            Back to Login
          </Link>
        </div>
      )}
      <br />
    </div>
  );
}
