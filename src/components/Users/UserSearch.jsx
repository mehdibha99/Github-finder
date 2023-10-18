import React from "react";
import { useState, useContext } from "react";
import { GithubContext } from "../../context/Github/GithubContext";
import { AlertContext } from "../../context/Alert/AlertContext";

function UserSearch() {
  const [text, setText] = useState("");
  const { usersList, searchUsers, cleanUsersList } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handelChange = (e) => {
    setText(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter a text", "error");
    } else {
      searchUsers(text);
      setText("");
    }
  };
  //clean users
  const handelClick = (e) => {
    cleanUsersList();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mb-8 gap-8 ">
      <div>
        <form onSubmit={handelSubmit}>
          <div className="form">
            <div className="relative">
              <input
                type="text"
                className="input input-lg w-full pr-40 text-black bg-gray-200 "
                placeholder="Search..."
                value={text}
                onChange={handelChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none btn btn-lg w-36 text-white "
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {usersList.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg " onClick={handelClick}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
