import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReceiptContext } from "../../hooks/useReceiptContext";

import { UserDetails, FriendRequestResponse } from "../../@types/receipt-manager";

interface Props {
  onAccept: (friend: UserDetails) => void,
}

export const FriendRequests = (props: Props) => {
  const [requests, setRequests] = useState<UserDetails[]>([]);
  const [jwt, apiUrl] = useReceiptContext();

  useEffect(() => {
    fetch(`${apiUrl}/users/pending-requests`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Accept": "application/json"
      }
    }).then(res => {
      return res.json();
    }).then((data: UserDetails[]) => {
      // console.log(data);
      setRequests(data);
    }).catch(err => {
      console.log("An error occured while getting pending friend requests.");
      console.error(err);
    });
  }, []);

  const onRequestResponse = (friend: UserDetails, reply: boolean): void => {
    const requestResponse: FriendRequestResponse = {
      email: friend.email,
      reply,
    };

    fetch(`${apiUrl}/users/friend-request-response`, {
      method: "POST",
      body: JSON.stringify(requestResponse),
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Accept": "application/json"
      }
    }).then(res => {
      return res.json();
    }).then((data) => {
      if (reply && "Success" in data)
        props.onAccept(friend)
      // console.log(data);
    }).catch(err => {
      console.log("An error occured while responding to friend request.");
      console.error(err);
    }).finally(() => {
      setRequests(prevRequests => prevRequests.filter(user => user.email !== friend.email));
    });
  }


  return (
    <div className="friends-pending">
      <p className="text-3xl mb-4 border-b border-solid border-gray">Pending Requests</p>
      {requests && requests.map(user => {
        return (
          <div key={user.id}>
            <p>
              {user.firstName} {user.lastName} ({user.email})
              <span
                className="text-green-300 ml-2 hover:text-green-400 hover:cursor-pointer"
                onClick={() => onRequestResponse(user, true)}
              >
                Accept <FontAwesomeIcon icon="check" />
              </span>
              <span
                className="text-red-300 ml-2 hover:text-red-400 hover:cursor-pointer"
                onClick={() => onRequestResponse(user, false)}
              >
                Reject <FontAwesomeIcon icon="xmark" />
              </span>
            </p>
          </div>
        )
      })}
      {requests.length <= 0 &&
        <p className="text-xl">You have no pending friend requests.</p>
      }
    </div>
  );
}
