import { createContext } from "react";

import { IContext } from "./@types/receipt-manager";

export default createContext<IContext | null>(null);
