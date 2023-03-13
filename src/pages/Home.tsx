import { useReceiptContext } from "../hooks/useReceiptContext";

export default function Home() {
  document.title = "Budgeze";
  const [jwt, setJwt, apiUrl] = useReceiptContext();

  return (
    <>
      <h1 className="text-3xl">Home</h1>
      <p>Jwt: <br/>{jwt ? jwt : "Not logged in"}</p>
    </>
  );
}