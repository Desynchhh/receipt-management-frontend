import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faPen, faXmark);

import { IContext, StateContext } from "./@types/receipt-manager";

import { ProtectedRoute } from "./components/ProtectedRoute";

import Context from "./Context";
import Navbar from "./components/nav/Navbar";
import Home from "./pages/Home";
import ReceiptList from "./pages/receipts/ReceiptList";
import Receipt from "./pages/receipts/Receipt";
import ReceiptNew from "./pages/receipts/ReceiptNew";
import UserLogin from "./pages/users/UserLogin";
import UserLogout from "./pages/users/UserLogout";
import UserNew from "./pages/users/UserNew";


const App = () => {
	const [jwt, setJwt] = useState("");

	const jwtContext: StateContext<string> = [ jwt, setJwt ];
	const context: IContext<string> = {
		"jwtContext": jwtContext,
		"apiUrl": "http://localhost:8080/apiv2"
	};

	return (
		<Context.Provider value={context}>
			<div className="container mx-auto">
				<Navbar />
				<ProtectedRoute />
				<Routes>
					<Route index element={<Home />} />
					<Route path="/receipts">
						<Route index element={<ReceiptList />} />
						<Route path=":id" element={<Receipt />} />
						<Route path="create" element={<ReceiptNew />} />
					</Route>
					<Route path="/user">
						<Route path="create" element={<UserNew />} />
						<Route path="login" element={<UserLogin />} />
						<Route path="logout" element={<UserLogout />} />
					</Route>
				</Routes>
			</div>
		</Context.Provider>
	)
}

export default App
