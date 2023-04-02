import { useEffect } from "react";
import { HttpPostResponse } from "../../@types";
import { useReceiptContext } from "../../hooks/useReceiptContext";
import { useNavigate } from "react-router-dom";

interface Props {
  onLogout: () => void,
}

const UserLogout = (props: Props) => {
  const [jwt, apiUrl] = useReceiptContext();
  const navigate = useNavigate();

  const fetchLogout = async (): Promise<boolean> => {
    const res = await fetch(`${apiUrl}/users/logout`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });
    const data: HttpPostResponse<boolean, boolean> = await res.json();
    return data.Success || false;
  }

  useEffect(() => {
    fetchLogout()
      .then((res) => {
        if (res) {
          props.onLogout();
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