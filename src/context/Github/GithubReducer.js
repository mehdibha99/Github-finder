const GithubReducer = (state, action) => {
  switch (action.type) {
    case "GET_FOLLOWERS":
      return {
        ...state,
        followers: action.payload,
        loading: false,
      };
    case "GET_FOLLOWING":
      return {
        ...state,
        following: action.payload,
        loading: false,
      };
    case "GET_USER_AND_REPO":
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
    case "CLEAR_USERS":
      return {
        ...state,
        usersList: [],
      };
    case "GET_USERS":
      return {
        ...state,
        usersList: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default GithubReducer;
