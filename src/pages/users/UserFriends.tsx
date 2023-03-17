import { useState, useEffect, useRef } from "react";
import { useReceiptContext } from "../../hooks/useReceiptContext";
import { Modal } from "../../components/Modal";

import { Friend } from "../../components/users/Friend";
import { AddFriend } from "../../components/users/AddFriend";
import { FriendRequests } from "../../components/users/FriendRequests";

import { UserDetails } from "../../@types/receipt-manager";

export const UserFriends = () => {
  const [friends, setFriends] = useState<UserDetails[]>([]);
  const friendEmailRef = useRef<HTMLInputElement>(null);
  const [jwt, setJwt, apiUrl] = useReceiptContext();

  if(!jwt) {
    window.location.replace("/");
  }

  useEffect(() => {
    fetch(`${apiUrl}/users/friends`, {
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
    }).catch(err => {
      console.log("An error occured while getting friends.");
      console.error(err);
    });
  }, []);

  const onAcceptFriendRequest = (friend:UserDetails) => {
    setFriends(prevFriends => [...prevFriends, friend]);
  }

  return(
    <>
    <div className="friends-container flex justify-around">
      <div className="flex flex-col justify-between gap-16">
        <AddFriend  />
        <hr />
        <FriendRequests onAccept={onAcceptFriendRequest} />
      </div>
      <div className="friends min-w-3/10">
        <div className="text-3xl border-b border-solid border-gray">Friends</div>
        {friends && friends.map(friend => {
          return(
            <Friend key={friend.id} friend={friend} />
          );
        })}
      </div>
    </div>
    </>
  );
}
