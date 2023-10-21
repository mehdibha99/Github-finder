import React from "react";
import PropTypes from "prop-types";
import RepoItems from "./RepoItem";
function ReposList({ repos }) {
  return (
    <div className="bg-base-200 rounded-lg shadow-lg card">
      <div className="card-body">
        <h2 className="text-3xl font-bold card-title my-4">Top Repos</h2>
        {repos.map((repo) => (
          <RepoItems key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

ReposList.propTypes = {
  repos: PropTypes.object.isRequired,
};

export default ReposList;
