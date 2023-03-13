import { useReceiptContext } from "../hooks/useReceiptContext";

export const ProtectedRoute = () => {
  const [jwt, setJwt, apiUrl] = useReceiptContext();

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