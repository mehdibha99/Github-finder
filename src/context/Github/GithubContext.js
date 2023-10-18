import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";
export const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  const initialState = {
    usersList: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  const cleanUsersList = () => {
    dispatch({ type: "CLEAR_USERS" });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

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

    const Response = await fetch(`${GITHUB_URL}/users/?${login}`, {
      headers: {
        authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (Response.status === 404) {
      window.location("NotFound");
    } else {
      const data = await Response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  return (
    <GithubContext.Provider
      value={{
        loading: state.loading,
        usersList: state.usersList,
        user: state.user,
        searchUsers,
        cleanUsersList,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
