import { UserDetails } from "../../@types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  friend: UserDetails
}

export const Friend = (props: Props) => {
  const fullName = `${props.friend.firstName} ${props.friend.lastName}`
  return (
    <div className="friend my-4">
      <p className="m-0">{fullName} <FontAwesomeIcon className="text-sm hover:cursor-pointer text-red-300" icon="xmark" /></p>
      <small>{props.friend.email}</small>
    </div>
  );
}