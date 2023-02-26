import { useEffect, useContext } from "react";
import Context from "../../Context";
import { IContext, HttpPostResponse } from "../../@types/receipt-manager";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const context = useContext(Context) as IContext;
  const [jwt, setJwt] = context.jwtContext;
  const navigate = useNavigate();

  const fetchLogout = async (): Promise<boolean> => {
    const res = await fetch(`${context.apiUrl}/users/logout`, {
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