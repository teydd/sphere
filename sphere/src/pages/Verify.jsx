import React from 'react'
import { Link } from 'react-router-dom'

export default function Verify() {
  return (
    <>
    <div className="container bg-whit mt-5 col-sm-6 col-md-6 col-lg-4 form rounded-5">
        <div className=" text-center">
         <Link className="text-decoration-none text-black lead fw-bold" href="/" to={"/"}>Sphere</Link>
        </div>
        <p className="text-center pt-3">Enter verification code</p>
        <hr />
        
        <br />
      </div>
    </>
  )
}
