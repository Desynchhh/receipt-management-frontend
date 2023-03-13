import { useEffect } from "react";
import { HttpPostResponse } from "../../@types/receipt-manager";
import { useReceiptContext } from "../../hooks/useReceiptContext";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const [jwt, setJwt, apiUrl] = useReceiptContext();
  const navigate = useNavigate();

  const fetchLogout = async (): Promise<boolean> => {
    const res = await fetch(`${apiUrl}/users/logout`, {
      method: "post",
      // headers: {
      //   "Authorization": `Bearer ${jwt}`
      // }
    });
    const data: HttpPostResponse<boolean, boolean> = await res.json();
    return data.Success || false;
  }

  useEffect(() => {
    fetchLogout()
      .then((res) => {
        if (res) {
          setJwt("");
        }
        navigate("/", { replace: true });
      })
      .finally(() => {
        navigate("/", { replace: true });
      });
  });

  return (
    <h2>Logging out...</h2>
  );
}

export default UserLogout;