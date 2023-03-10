import { useState, useEffect, useContext } from "react";
import Context from "../Context";
import { IContext } from "../@types/receipt-manager";


export const useReceiptContext = (): [string, React.Dispatch<React.SetStateAction<string>>, string] => {
  const context = useContext(Context) as IContext;

  const [jwt, setJwt] = context.jwtContext;
  const apiUrl = context.apiUrl;

  return [jwt, setJwt, apiUrl];
}

