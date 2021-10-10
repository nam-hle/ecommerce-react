import { ADD_USER, DELETE_USER, EDIT_USER, GET_USER, REGISTER_USER } from "../../constants";

// insert in profile array
export const registerUser = (user: string) => ({
  type: REGISTER_USER,
  payload: user,
});

export const getUser = (uid: string) => ({
  type: GET_USER,
  payload: uid,
});

// different from registerUser -- only inserted in admins' users array not in profile array
export const addUser = (user: string) => ({
  type: ADD_USER,
  payload: user,
});

export const editUser = (updates: string) => ({
  type: EDIT_USER,
  payload: updates,
});

export const deleteUser = (id: string) => ({
  type: DELETE_USER,
  payload: id,
});
