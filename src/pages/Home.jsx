import React from "react";
import UsersList from "../components/Users/UsersList";
import UserSearch from "../components/Users/UserSearch";
function Home() {
  return (
    <div className="text-4xl text-white">
      <UserSearch />
      <UsersList />
    </div>
  );
}

export default Home;
