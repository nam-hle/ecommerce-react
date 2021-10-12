import { AnyAction } from "typescript-fsa";

import { addUser, deleteUser, editUser } from "../actions";

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

export function userReducer(state: UserState = [], action: AnyAction): UserState {
  if (state === undefined) {
    return [];
  }

  if (addUser.match(action)) {
    return [...state, action.payload];
  }

  if (editUser.match(action)) {
    return state.map((user) => {
      if (user.id === action.payload.id) {
        return {
          ...user,
          ...action.payload,
        };
      }
      return user;
    });
  }

  if (deleteUser.match(action)) {
    return state.filter((user) => user.id !== action.payload);
  }

  return state;
}
