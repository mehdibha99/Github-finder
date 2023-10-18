import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function UserItem({ user: { login, avatar_url } }) {
  return (
    <div className="card-side shadow-md bg-base-100 compact">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img src={avatar_url} alt="Profile_picture" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{login}</h2>
          <Link
            to={`/user/${login}`}
            className="text-opacity-40 text-base-content text-sm"
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};
export default UserItem;
