import actionCreatorFactory from "typescript-fsa";

import { User } from "../reducers/userReducer";

const factory = actionCreatorFactory("USER");

// insert in profile array
export const registerUser = factory<RegisterUserPayload>("REGISTER_USER");
export type RegisterUserPayload = string;

export type GetUserPayload = string;
export const getUser = factory<GetUserPayload>("GET_USER");

// different from registerUser -- only inserted in admins' users array not in profile array
export const addUser = factory<AddUserPayload>("ADD_USER");
export type AddUserPayload = User;

export const editUser = factory<EditUserPayload>("EDIT_USER");
export interface EditUserPayload extends Partial<User> {
  id: string;
}

export const deleteUser = factory<DeleteUserPayload>("DELETE_USER");
export type DeleteUserPayload = string;
