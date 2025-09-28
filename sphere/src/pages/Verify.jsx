import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore';

export default function Verify() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { verify, error, isLoading } = useAuthStore();

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    if (value.length === 6) {
      handleVerify(value);
    }
  };

  const handleVerify = async (code) => {
    const success = await verify(code);
    if (success) {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length === 6) {
      handleVerify(code);
    }
  };

  return (
    <div className="container mt-5 col-sm-6 col-md-6 col-lg-4 form rounded-5">
      <div className="text-center">
        <Link className="text-decoration-none text-black lead fw-bold" to={"/"}>Sphere</Link>
      </div>
      <p className="text-center pt-3">Enter verification code</p>
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={handleChange}
          maxLength={6}
          className="form-control text-center"
          style={{ letterSpacing: "0.5em", fontSize: "1.5em", width: "180px", margin: "0 auto" }}
          autoFocus
        />
      </form>
      {error && <div className="text-danger text-center mt-2">{error}</div>}
      <br />
    </div>
  )
}
