import FollowItem from "./FollowItem";
import { useContext } from "react";
import { GithubContext } from "../../context/Github/GithubContext";
import Spinner from "../layout/Spinner";
function FollowList({ text }) {
  const { loading, followers, following } = useContext(GithubContext);
  const res = text === "followers" ? followers : following;
  console.log(text);
  console.log(res);
  if (!loading) {
    return (
      <div className=" rounded-lg shadow-lg card">
        <div className="card-body">
          <h2 className="text-3xl font-bold card-title my-4">Followers</h2>
          {res.map((follow) => (
            <FollowItem key={follow.id} follow={follow} />
          ))}
        </div>
      </div>
    );
  } else return <Spinner />;
}

export default FollowList;
