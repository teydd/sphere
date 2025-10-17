import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Nav() {
  const {isAuthenticated,logout } = useAuthStore()
  return (
    <>
      <nav className="navbar  navbar-expand-sm">
        <div className="container-fluid">
          <Link
                  className="fs-1 text-white title text-decoration-none "
                  to={"/"}
                >
                  Sphere
                </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse w-100 justify-content-end" id="navbarNav">
            {isAuthenticated ? <button onClick={logout} className="btn bg-white border border-white  text-black float-end ">Logout</button> : <Link
              className="btn bg-white border border-white  text-black"
              to={"/signin"}
            >
              Signin
            </Link> }
          </div>
        </div>
      </nav>
    </>
  );
}
