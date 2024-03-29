import { useState, useEffect, useContext } from "react";
import Context from "../ReceiptContext";
import { IContext } from "../@types";


export const useReceiptContext = (): [string, string] => {
  const context = useContext(Context) as IContext;

  return [context.jwt, context.apiUrl];
}

