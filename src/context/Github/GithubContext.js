import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";
import axios from "axios";
export const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  const initialState = {
    usersList: [],
    user: {},
    repos: [],
    loading: false,
    following: [],
    followers: [],
  };
  const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {
      authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  const cleanUsersList = () => {
    dispatch({ type: "CLEAR_USERS" });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };
  //search for user with key word
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const Response = await github.get(`/search/users?${params}`);
    dispatch({
      type: "GET_USERS",
      payload: Response.data.items,
    });
  };

  //get User and Repo
  const getUserAndRepo = async (login) => {
    setLoading();
    const params = new URLSearchParams({
      per_page: 10,
    });

    const [user, repos] = await Promise.all([
      github.get(`/users/${login}`),
      github.get(`${GITHUB_URL}/users/${login}/repos?${params}`),
    ]);

    if (user.status === 404) {
      window.location.replace("NotFound");
    } else {
      dispatch({
        type: "GET_USER_AND_REPO",
        payload: { user: user.data, repos: repos.data },
      });
      dispatch({
        type: "GET_REPOS",
        payload: repos.data,
      });
    }
  };

  //get following or followers for single user
  const searchFollow = async (login, text) => {
    setLoading();

    const Response = await github.get(`/users/${login}/${text}`);

    if (text === "following") {
      dispatch({
        type: "GET_FOLLOWING",
        payload: Response.data,
      });
    } else if (text === "followers") {
      dispatch({
        type: "GET_FOLLOWERS",
        payload: Response.data,
      });
    }
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers,
        cleanUsersList,
        getUserAndRepo,
        searchFollow,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
