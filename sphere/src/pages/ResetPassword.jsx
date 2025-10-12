import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [form, setForm] = useState({
    password: "",
    confirmpass: "",
  });

  const {resetPass,isLoading,error} = useAuthStore()
  const {token} = useParams()
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const {password} = form
    try {
      if(form.password !== form.confirmpass){
      return toast.error("Password should match")
    }
      await resetPass(password,token) 
      navigate("/signin")     
      toast.success("Password changed successfully")
    } catch (error) {
      
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
    <>
      <div className="container bg-whit mt-5 col-sm-6 col-md-6 col-lg-4 form rounded-5">
        <div className=" text-center">
          <a className="text-decoration-none text-black lead fw-bold" href="/">
            Sphere
          </a>
        </div>
        <p className="text-center pt-3">Enter new password</p>
        <hr />
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="password"
            name="password"
            value={form.password}
            onChange={handleOnchange}
            placeholder="Password"
            autoFocus
          />{" "}
          <br />
          <input
            className="form-control"
            type="password"
            name="confirmpass"
            value={form.confirmpass}
            onChange={handleOnchange}
            placeholder="Confirm Password"
          />{" "}
          {error}
          <hr />
          <button className="btn btn-outline-dark w-100">Submit</button>
          <hr />
        </form>
        <br />
      </div>
    </>
  );
}
