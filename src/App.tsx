import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/nav/Navbar";
import Home from "./pages/Home";
import ReceiptList from "./pages/receipts/ReceiptList";
import Receipt from "./pages/receipts/Receipt";
import ReceiptNew from "./pages/receipts/ReceiptNew";
import UserLogin from "./pages/users/UserLogin";
import UserLogout from "./pages/users/UserLogout";
import UserNew from "./pages/users/UserNew";

function App() {
	const DEFAULT_DOCUMENT_TITLE = "Budgeze";
	const [documentTitle, setDocumentTitle] = useState(document.title);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [jwt, setJwt] = useState("");

	useEffect(() => {
		if (documentTitle.length <= 0) {
			setDocumentTitle(DEFAULT_DOCUMENT_TITLE);
		}
		document.title = documentTitle;
	}, [documentTitle]);

	return (
		<div className="container mx-auto">
			<Navbar isLoggedIn={isLoggedIn} />
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
	)
}

export default App
