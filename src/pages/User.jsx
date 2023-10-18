import userEvent from "@testing-library/user-event";
import { useEffect, useContext } from "react";
import { GithubContext } from "../context/Github/GithubContext";

function User() {
  const { user, getUser } = useContext(GithubContext);
  useEffect(() => {
    getUser();
  }, []);

  return <div>{user.login}</div>;
}

export default User;
