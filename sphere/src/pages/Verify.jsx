import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";

export default function Verify() {
  const [code, setCode] = useState("");
  const { verify, error } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (code.length === 6) {
      handleSubmit();
    }
  }, [code]);
  const handleChange = (e) => {
    setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (code.length === 6) {
      await verify(code);
      navigate("/");
      toast.success("Verification successful");
    }
  };
  return (
    <div className="container mt-5 col-sm-6 col-md-6 col-lg-4 form rounded-5">
      <div className="text-center">
        <Link className="text-decoration-none text-black lead fw-bold" to={"/"}>
          Sphere
        </Link>
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
          style={{
            letterSpacing: "0.5em",
            fontSize: "1.5em",
            width: "180px",
            margin: "0 auto",
          }}
          autoFocus
        />
      </form>
      {error && <div className="text-danger text-center mt-2">{error}</div>}
      <br />
    </div>
  );
}
