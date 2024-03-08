import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import usersReducer from "./usersReducer";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const initialState = {
    users: [],
    isError: false,
    user: {},
    url: "",
    isLoading: false,
  };

  const [state, dispatch] = useReducer(usersReducer, initialState);

  
  const getUsers = (data) => {
    dispatch({
          type: "SET_LOADING",
          payload: true,
        });
    axios(`${process.env.REACT_APP_API_URL}/users`)
      .then((res) => {
        const {users} = res.data;
        dispatch({
          type: "GET_USERS",
          payload: users,
        });
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ERROR",
          payload: true,
        });
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      });
  };

  const addUsers = async (user) => {

    axios
      .post(`${process.env.REACT_APP_API_URL}/add-user`, user)
      .then((res) => {
        getUsers();
      })
      .catch((err) => {
        dispatch({
          type: "ERROR",
          payload: true,
        });
      });
  };

  const updateUsers = async (userid, user) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/edit-user/${userid}`, user)
      .then((res) => {
        const {user} = res.data;
        dispatch({
          type: "UPDATE_USERS",
          payload: user,
        });
        getUsers();
      })
      .catch((err) => {
        dispatch({
          type: "ERROR",
          payload: true,
        });
      });
  };

  const deleteUser = async (userid) => {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/delete-user`, { data: { id: userid } })
      .then((res) => {
        getUsers();
      })
      .catch((err) => {
        dispatch({
          type: "ERROR",
          payload: true,
        });
      });
  };

    useEffect(() => {
        getUsers();
    }, []);

  return (
    <UsersContext.Provider
      value={{ users: state.users, isError: state.isError, isLoading: state.isLoading ,getUsers ,updateUsers, deleteUser, addUsers }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
