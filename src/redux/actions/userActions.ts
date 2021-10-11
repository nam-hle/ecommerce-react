import { ADD_USER, DELETE_USER, EDIT_USER, GET_USER, REGISTER_USER } from "../../constants";
import { User } from "../reducers/userReducer";

// insert in profile array
export const registerUser = (user: string) => ({
  type: REGISTER_USER,
  payload: user,
});

export const getUser = (uid: string) => ({
  type: GET_USER,
  payload: uid,
});

export type AddUserPayload = User;

// different from registerUser -- only inserted in admins' users array not in profile array
export const addUser = (user: User) => ({
  type: ADD_USER,
  payload: user,
});

export interface EditUserPayload extends Partial<User> {
  id: string;
}

export const editUser = (updates: EditUserPayload) => ({
  type: EDIT_USER,
  payload: updates,
});

export type DeleteUserPayload = string;

export const deleteUser = (id: string) => ({
  type: DELETE_USER,
  payload: id,
});
