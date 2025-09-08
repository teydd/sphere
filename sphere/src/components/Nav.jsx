import React from "react";

export default function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/world">
            
          </a>
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
                <a className="nav-link active title" aria-current="page" href="/">
                <i className="fs-1 text-white">
                  Sphere
                </i>
                </a>
              </li>              
            </ul>
            
                <a className="nav-link active title ailgn-items-center text-center" aria-current="page" href="/login">
                <i className=" text-white">
                  Login
                </i>
                </a>
          </div>
        </div>
      </nav>
    </>
  );
}
