import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
function Navbar({ title }) {
  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none mx-2 px-2">
          <FaGithub className="inline pr-2 text-3xl" />
          <Link to="/" className="text-bold align-middle text-lg text-white">
            {title}
          </Link>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link
              to="/"
              className="btn btn-ghost btn-sm  rounded-btn text-white"
            >
              Home
            </Link>
            <Link
              to="/About"
              className="btn btn-ghost btn-sm  rounded-btn text-white"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
Navbar.defaultProps = {
  title: "Github Finder",
};

Navbar.propTypes = {
  title: PropTypes.string,
};
export default Navbar;
