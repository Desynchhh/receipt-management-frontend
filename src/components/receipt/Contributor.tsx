import { UserDetails } from "../../@types/receipt-manager";

interface Props {
  contributor: UserDetails,
  onRemove: (id:number) => void,
}

export const Contributor = (props:Props) => {
  return(
    <>
      <span
        className="text-red-500 mr-1 cursor-pointer"
        onClick={() => props.onRemove(props.contributor.id)}
      >
          &times;
      </span>
      {props.contributor.firstName} {props.contributor.lastName}
    </>
  );
}