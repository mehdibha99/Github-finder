import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
function NotFound() {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-lg font-bold text-white">
          <h1 className="text-8xl mb-8">Oops</h1>
          <p className="text-5xl mb-6">404 - page not found</p>
          <Link to="/" className="btn btn-primary btn-lg">
            <FaHome className="mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
