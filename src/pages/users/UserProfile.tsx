import { useReceiptContext } from "../../hooks/useReceiptContext";

export const UserProfile = () => {
  const [jwt, apiUrl] = useReceiptContext();
  if (!jwt) {
    window.location.replace("/");
  }

  return (
    <h1 className="text-3xl">Profile!</h1>
  );
}