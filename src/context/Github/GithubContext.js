import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";
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

    const Response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await Response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //get User
  const getUser = async (login) => {
    setLoading();

    const Response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (Response.status === 404) {
      window.location.replace("NotFound");
    } else {
      const data = await Response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //return all the repo for single user
  const searchRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      per_page: 10,
    });

    const Response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await Response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  //get following or followers for single user
  const searchFollow = async (login, text) => {
    setLoading();

    const Response = await fetch(`${GITHUB_URL}/users/${login}/${text}`, {
      headers: {
        authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await Response.json();

    if (text === "following") {
      dispatch({
        type: "GET_FOLLOWING",
        payload: data,
      });
    } else if (text === "followers") {
      dispatch({
        type: "GET_FOLLOWERS",
        payload: data,
      });
    }
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers,
        cleanUsersList,
        getUser,
        searchRepos,
        searchFollow,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
