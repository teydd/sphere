import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Verify() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    setError("");
    // Auto-submit when 6 digits entered
    if (value.length === 6) {
      handleSubmit(value);
    }
  };

  const handleSubmit = (enteredCode) => {
    if (enteredCode === "123456") {
      navigate("/");
    } else {
      setError("Invalid code. Please try again.");
      setCode("");
    }
  };

  return (
    <div className="container mt-5 col-sm-6 col-md-6 col-lg-4 form rounded-5">
      <div className="text-center">
        <Link className="text-decoration-none text-black lead fw-bold" to={"/"}>Sphere</Link>
      </div>
      <p className="text-center pt-3">Enter verification code</p>
      <hr />
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(code);
        }}
        className="text-center"
      >
        <input
          type="text"
          value={code}
          onChange={handleChange}
          maxLength={6}
          className="form-control text-center"
          style={{ letterSpacing: "0.5em", fontSize: "1.5em", width: "180px", margin: "0 auto" }}
          autoFocu
        />
        <button type="submit" className="btn btn-primary mt-3 w-100">Verify</button>
      </form>
      {error && <div className="text-danger text-center mt-2">{error}</div>}
      <br />
    </div>
  )
}
