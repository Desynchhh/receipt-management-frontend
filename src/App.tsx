import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faPen, faXmark, faCheck);

import { IContext, UserDetails } from "./@types";

import { ProtectedRoute } from "./components/ProtectedRoute";

import Context from "./ReceiptContext";
import Navbar from "./components/nav/Navbar";
import Home from "./pages/Home";
import ReceiptList from "./pages/receipts/ReceiptList";
import Receipt from "./pages/receipts/Receipt";
import ReceiptNew from "./pages/receipts/ReceiptNew";
import UserLogin from "./pages/users/UserLogin";
import UserLogout from "./pages/users/UserLogout";
import UserNew from "./pages/users/UserNew";
import { UserProfile } from "./pages/users/UserProfile";
import { UserFriends } from "./pages/users/UserFriends";


const App = () => {
	// const [jwt, setJwt] = useState("");
	const [jwt, setJwt] = useState("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJtbEBlbWFpbC50ZXN0IiwiZmlyc3RfbmFtZSI6Ik1pa2tlbCIsImxhc3RfbmFtZSI6IkxhcnNlbiIsInBhc3N3b3JkIjoiJDJiJDEyJHpha1hJbXhXNUlabFRqLzlzV1lHdk9BYlVCeVNSQVpsVWlOLk9XSWl0Zi5USWNYdS5OalpXIiwiZXhwIjoxNjgxMDQ4MTQ4fQ.t4vfsyi24z3DII5bj4FMePTu8qi4xWU4fJ_E-E4K8rg");
	const [friends, setFriends] = useState<UserDetails[]>([]);

	const context: IContext = {
		"jwt": jwt,
		"apiUrl": "http://localhost:8080/apiv2"
	};

	useEffect(() => {
		if (!jwt) {
			setFriends([]);
			return;
		};

		fetch(`${context.apiUrl}/users/friends`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${jwt}`,
				"Accept": "application/json"
			}
		}).then(res => {
			return res.json();
		}).then((data: UserDetails[]) => {
			console.log(data);
			setFriends(data);
			console.log("friends set!");
		}).catch(err => {
			console.log("An error occured while getting friends.");
			console.error(err);
		});
	}, [friends.length, jwt]);

	const handleLogout = (): void => {
		setJwt("");
	}

	const handleLogin = (token: string): void => {
		setJwt(token);
	}

	const onAddFriend = (newFriend: UserDetails): void => {
		setFriends(prevFriends => [...prevFriends, newFriend]);
	}

	const onRemoveFriend = (oldFriend: UserDetails): void => {
		setFriends(prevFriends => prevFriends.filter(friend => friend.id !== oldFriend.id));
	}

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
						<Route path="create" element={<ReceiptNew friends={friends} />} />
					</Route>
					<Route path="/user">
						<Route path="create" element={<UserNew />} />
						<Route path="friends" element={<UserFriends friends={friends} addFriend={onAddFriend} />} />
						<Route path="login" element={<UserLogin onLogin={handleLogin} />} />
						<Route path="profile" element={<UserProfile />} />
						<Route path="logout" element={<UserLogout onLogout={handleLogout} />} />
					</Route>
				</Routes>
			</div>
		</Context.Provider>
	)
}

export default App
