import React from "react";

export type StateContext = [
	string,
	React.Dispatch<React.SetStateAction<string>>
];

export interface IContext {
	"jwtContext": StateContext
}
