import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faPen, faXmark, faCheck);

import { IContext, StateContext, UserDetails } from "./@types/receipt-manager";

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
	const [jwt, setJwt] = useState("");
  const [friends, setFriends] = useState<UserDetails[]>([]);

	const jwtContext: StateContext<string> = [ jwt, setJwt ];
	const context: IContext<string> = {
		"jwtContext": jwtContext,
		"apiUrl": "http://localhost:8080/apiv2"
	};

	const onAddFriend = (newFriend: UserDetails): void => {
		setFriends(prevFriends => [...prevFriends, newFriend]);
	}

	const onRemoveFriend = (oldFriend: UserDetails): void => {
		setFriends(prevFriends => prevFriends.filter(friend => friend.id !== oldFriend.id));
	}
	
  useEffect(() => {
		if(!jwt) {
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
    }).then((data:UserDetails[]) => {
      console.log(data);
      setFriends(data);
			console.log("friends set!");
    }).catch(err => {
      console.log("An error occured while getting friends.");
      console.error(err);
    });
  }, [friends.length, jwt]);

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
						<Route path="login" element={<UserLogin />} />
						<Route path="profile" element={<UserProfile />} />
						<Route path="logout" element={<UserLogout />} />
					</Route>
				</Routes>
			</div>
		</Context.Provider>
	)
}

export default App
