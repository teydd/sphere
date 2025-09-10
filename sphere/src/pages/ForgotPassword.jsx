import React from 'react'

export default function ForgotPassword() {
  return (
   <div className="container bg-whit mt-5 col-sm-6 col-md-6 col-lg-4 form rounded-5">
        <div className=" text-center">
          <a className='text-decoration-none text-black lead fw-bold' href="/">Sphere</a>
        </div>
        <p className="text-center pt-3">Enter your email</p>
        <hr />
        <form>
          <input
            className="form-control"
            type="text"
            name=""
            id=""
            placeholder="Email"
          />{" "}
          <hr />
          <button className="btn btn-outline-dark w-100">Submit</button>
          <hr />
        </form>
        <br />
      </div>
  )
}
