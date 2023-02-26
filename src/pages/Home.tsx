import { useContext } from "react";
import { IContext } from "../@types/receipt-manager";
import Context from "../Context";

export default function Home() {
  document.title = "Budgeze";
  const context = useContext(Context) as IContext;
  const [jwt, setJwt] = context.jwtContext;
  return (
    <>
      <h1 className="text-3xl">Home</h1>
      <pre>Jwt: <br/>{jwt ? jwt : "Not logged in"}</pre>
    </>
  );
}