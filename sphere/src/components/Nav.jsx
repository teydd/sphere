import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid">
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
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav align-items-center justify-content-center w-100">
              <li className="nav-item ">
                <Link className="fs-1 text-white title text-decoration-none" to={"/"}>Sphere</Link>
              </li>
            </ul>
            <Link className="btn bg-white border border-white  text-black float-end" to={"/signin"}>Signin</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
