import React from "react";

export type StateContext = [
	string,
	React.Dispatch<React.SetStateAction<string>>
];

export interface IContext {
	"jwtContext": StateContext,
	"apiUrl": string
}

export interface UserObject {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  apiToken?: string,
  createdAt: string,
  updatedAt: string,
  isDeleted: boolean
}

export interface HttpPostResponse<S, F> {
  Failure?: F,
  Success?: S
}