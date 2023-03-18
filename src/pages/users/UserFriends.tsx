import { useState, useEffect, useRef } from "react";
import { useReceiptContext } from "../../hooks/useReceiptContext";
import { Modal } from "../../components/Modal";

import { Friend } from "../../components/users/Friend";
import { AddFriend } from "../../components/users/AddFriend";
import { FriendRequests } from "../../components/users/FriendRequests";

import { UserDetails } from "../../@types/receipt-manager";

interface Props {
  friends: UserDetails[],
  addFriend: (newFriend: UserDetails) => void
}

export const UserFriends = (props: Props) => {
  const [jwt, apiUrl] = useReceiptContext();
  if (!jwt) {
    window.location.replace("/");
  }

  const friendEmailRef = useRef<HTMLInputElement>(null);
  console.log(props.friends);


  const onAcceptFriendRequest = (friend: UserDetails) => {
    props.addFriend(friend);
  }

  return (
    <>
      <div className="friends-container flex justify-around">
        <div className="flex flex-col justify-between gap-16">
          <AddFriend />
          <FriendRequests onAccept={onAcceptFriendRequest} />
        </div>
        <div className="friends min-w-3/10">
          <div className="text-3xl border-b border-solid border-gray">Friends</div>
          {props.friends && props.friends.map(friend => {
            return (
              <Friend key={friend.id} friend={friend} />
            );
          })}
        </div>
      </div>
    </>
  );
}
