import { useEffect, useContext } from "react";
import { GithubContext } from "../context/Github/GithubContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCodepen, FaStore, FaUserFriends, FaUser } from "react-icons/fa";
import Spinner from "../components/layout/Spinner";
import ReposList from "../components/Repos/ReposList";
import UserDialog from "../components/Follow/UserDialog";
function User() {
  const { user, getUser, loading, repos, searchRepos, searchFollow } =
    useContext(GithubContext);
  const params = useParams();
  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;
  useEffect(() => {
    getUser(params.login);
    searchRepos(params.login);
    searchFollow(params.login, "following");
    searchFollow(params.login, "followers");
  }, [params.login]);

  if (loading) return <Spinner />;
  return (
    <>
      <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4 ">
          <Link to="/" className="btn btn-ghost">
            Back To Search
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 mb-8 gap-8">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className=" shadow-xl  card-image-full">
              <figure>
                <img
                  src={avatar_url}
                  alt={`image_for_${name}`}
                  className="rounded-lg"
                />
              </figure>
              <div className="card-body  ">
                <h2 className="mb-0 card-title">{name}</h2>
                <p>{login}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl card-text">
                {name}
                <div className="ml-2 mr-1 badge badge-success">{type}</div>
                {hireable && (
                  <div className="mx-1 badge badge-info">Hireable</div>
                )}
              </h1>
              <p>{bio}</p>
              <div className="mt-4 card-action">
                <a
                  href={html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  Visit Github Profile
                </a>
              </div>
            </div>
            <div className="stats w-full bg-base-200 rounded-lg shadow-md ">
              {location && (
                <div className="stat">
                  <div className="stat-title text-md">location</div>
                  <div className="text-lg stat-value">{location}</div>
                </div>
              )}
              {blog && (
                <div className="stat">
                  <div className="stat-title text-md">Website</div>
                  <div className="text-lg stat-value">
                    <a
                      href={`https://${blog}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {blog}
                    </a>
                  </div>
                </div>
              )}
              {twitter_username && (
                <div className="stat">
                  <div className="stat-title text-md">Twitter</div>
                  <div className="text-lg stat-value">
                    <a
                      href={`https://tawitter.com/${twitter_username}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {twitter_username}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full py-5 shadow-md bg-base-100 rounded-lg stats">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUserFriends className="text-3xl md:text-5xl" />
            </div>
            <div
              className="stat-title pr-5 cursor-pointer"
              onClick={() => {
                document.getElementById("modal_1").showModal();
              }}
            >
              Followers
            </div>
            <UserDialog
              text={"followers"}
              login={params.login}
              id={"modal_1"}
            />
            <div className="stat-value pr-4 text-3xl md:text-4xl">
              {followers}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUser className="text-3xl md:text-5xl" />
            </div>
            <div
              className="stat-title pr-5 cursor-pointer"
              onClick={() => {
                document.getElementById("modal_2").showModal();
              }}
            >
              Following
            </div>
            <UserDialog
              text={"following"}
              login={params.login}
              id={"modal_2"}
            />
            <div className="stat-value pr-4 text-3xl md:text-4xl">
              {following}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaCodepen className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Repo</div>
            <div className="stat-value pr-4 text-3xl md:text-4xl">
              {public_repos}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaStore className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Public Gists</div>
            <div className="stat-value pr-4 text-3xl md:text-4xl">
              {public_gists}
            </div>
          </div>
        </div>
        <ReposList repos={repos} />
      </div>
    </>
  );
}

export default User;
