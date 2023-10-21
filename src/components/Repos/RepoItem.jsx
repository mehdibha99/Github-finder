import React from "react";
import PropTypes from "prop-types";
import { FaEye, FaInfo, FaLink, FaUtensils, FaStar } from "react-icons/fa";
function RepoItem({ repo }) {
  const {
    name,
    forks,
    html_url,
    description,
    open_issues,
    watchers_count,
    stargazers_count,
  } = repo;
  return (
    <div className="card rounded-md shadow-md mb-2  bg-gray-800  hover:bg-gray-900 ">
      <div className="card-body">
        <h3 className="text-xl font-semibold mb-2">
          <a
            href={html_url}
            target="_blank"
            rel="noreferrer"
            className="mb-2 hover:text-white"
          >
            <FaLink className="mr-2 inline" />
            {name}
          </a>
          <p className="mb-3">{description}</p>
        </h3>
        <div>
          <div className="badge badge-info badge-lg mr-2">
            <FaEye className="mr-2" />
            {watchers_count}
          </div>

          <div className="badge badge-success badge-lg mr-2">
            <FaStar className="mr-2" />
            {stargazers_count}
          </div>

          <div className="badge badge-danger badge-lg mr-2">
            <FaInfo className="mr-2" />
            {open_issues}
          </div>

          <div className="badge badge-warning badge-lg mr-2">
            <FaUtensils className="mr-2" />
            {forks}
          </div>
        </div>
      </div>
    </div>
  );
}
RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};
export default RepoItem;
