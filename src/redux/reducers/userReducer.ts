import { ADD_USER, DELETE_USER, EDIT_USER } from "../../constants";
import { AddUserPayload, DeleteUserPayload, EditUserPayload } from "../actions/userActions";
import { ActionWithPayload } from "./index";

// const initState = [
//   {
//     firstname: 'Gago',
//     lastname: 'Ka',
//     email: 'gagoka@mail.com',
//     password: 'gagooo',
//     avatar: '',
//     banner: '',
//     dateJoined: 0
//   }
// ];

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
  banner: string;
  dateJoined: number;
}

export type UserState = User[];

export type AddUserAction = ActionWithPayload<typeof ADD_USER, AddUserPayload>;
export type EditUserAction = ActionWithPayload<typeof EDIT_USER, EditUserPayload>;
export type DeleteUserAction = ActionWithPayload<typeof DELETE_USER, DeleteUserPayload>;

export type UserAction = AddUserAction | EditUserAction | DeleteUserAction;

export default (state: UserState = [], action: UserAction) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case EDIT_USER:
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload,
          };
        }
        return user;
      });
    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};
