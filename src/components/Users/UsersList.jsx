import React, { useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import { GithubContext } from "../../context/Github/GithubContext";
function UsersList() {
  const { loading, usersList } = useContext(GithubContext);
  if (!loading)
    return (
      <div
        className="grid grid-cols-1 gap-8 xl:grid-cols-4
        lg:grid-cols-3 md:grid-cols-2"
      >
        {usersList.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  else return <Spinner />;
}

export default UsersList;
