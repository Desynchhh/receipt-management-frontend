import React from "react";

export type StateContext = [
	string,
	React.Dispatch<React.SetStateAction<string>>,
];

export interface IContext {
	"jwtContext": StateContext,
	"apiUrl": string,
}

export interface FullUserObject {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  apiToken?: string,
  createdAt: string,
  updatedAt: string,
  isDeleted: boolean,
}

export interface UserDetails {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
}

// Ex: 2023-03-01
export type ReceiptDate = `${number}${number}${number}${number}-${number}${number}-${number}${number}` | "";
export const receiptDateRegex = /^[\d]{4}-[\d]{2}-[\d]{2}$/;

// Ex: 2023-03-01T12:00:00
export type ReceiptDateTime = `${ReceiptDate}T${number}${number}:${number}${number}:${number}${number}`;
export const receiptDateTimeRegex = /^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}$/;

export interface ReceiptItem {
  id?: number,
  product: string,
  price: number,
  discount: number,
  contributorIds?: number[],
}

export interface Receipt {
  userId?: number,
  store: string,
  date: ReceiptDate | ReceiptDateTime,
  items?: ReceiptItem[],
  subtotal: number
}

export interface PostReceipt {
  store: string,
  date: ReceiptDate | ReceiptDateTime,
  items: ReceiptItem[]
}

export interface HttpPostResponse<S, F> {
  Failure?: F,
  Success?: S,
}