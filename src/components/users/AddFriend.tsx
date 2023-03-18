import { useRef } from "react";
import { FriendRequest, HttpPostResponse } from "../../@types/receipt-manager";
import { useReceiptContext } from "../../hooks/useReceiptContext";

export const AddFriend = () => {
  const friendEmailRef = useRef<HTMLInputElement>(null);
  const [jwt, apiUrl] = useReceiptContext();

  const onAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    const email = friendEmailRef.current?.value;
    if (!email) {
      console.log("No email entered");
      return;
    }

    const friendRequest: FriendRequest = {
      email
    };

    fetch(`${apiUrl}/users/add-friend`, {
      method: "POST",
      body: JSON.stringify(friendRequest),
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(res => {
      return res.json();
    }).then((data: HttpPostResponse<string, string>) => {
      console.log(data);
    }).catch(err => {
      console.log("An error occured while getting friends.");
      console.error(err);
    }).finally(() => {
      if (friendEmailRef.current) {
        friendEmailRef.current.value = "";
      }
    });
  }


  return (
    <div className="add-friend">
      <form method="POST" onSubmit={onAddFriend}>
        <fieldset>
          <legend className="text-3xl">Add a new friend!</legend>
          <hr />
          <div className="form-control flex flex-col my-2">
            <label className="mb-1" htmlFor="friend-email">Enter friend's email:</label>
            <input type="email" ref={friendEmailRef} className="text-black" name="friend-email" id="friend-email" placeholder="Email" />
          </div>
          <button className="button" type="submit">Add friend</button>
        </fieldset>
      </form>
    </div>
  );
}