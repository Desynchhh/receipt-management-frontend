import { useContext } from "react";
import { IContext } from "../@types/receipt-manager";
import Context from "../Context";

export const ProtectedRoute = () => {
  const context = useContext(Context) as IContext
  const [jwt, setJwt] = context.jwtContext;

  const jwtRegex = new RegExp(/^[\w-]+\.[\w-]+\.[\w-]+$/);

  if(!jwt.match(jwtRegex)) {
    return (
      <h1>Not logged in.</h1>
    );
  }
  return(
    <h1>You are logged in!</h1>
  );
}