const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "UPDATE_USERS":
      return {
        ...state,
        user: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
