import { FormEvent, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { IContext, FullUserObject, HttpPostResponse } from "../../@types/receipt-manager";
import Context from "../../Context";

import { buildFormData, FormErrors } from "../../components/Form";

const UserLogin = () => {
  document.title = "Budgeze - Sign in";
  const context = useContext(Context) as IContext

  const [errors, setErrors] = useState<string[]>([]);
  const [jwt, setJwt] = context.jwtContext;
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const formData = buildFormData(e.target as HTMLFormElement);
      const res = await fetch(`${context.apiUrl}/users/login`, {
        method: "post",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });
  
      const data: HttpPostResponse<string, string[]> = await res.json();
      if (data.Failure) {
        setErrors(data.Failure);
        return;
      }
      if(data.Success) {
        setJwt(data.Success);
        navigate("/", { replace: true });
      }
    } catch (error) {
      if(error instanceof TypeError) {
        if(error.message.includes("NetworkError")) {
          setErrors(["Could not connect to server."]);
        }
      } else {
        setErrors(["Could not create user. Try again later."]);
      }      
    }
  }

  return (
    <>
      <legend className="text-3xl mb-3">Login</legend>
      <div className="flex flex-col mx-auto w-1/3">
        <form method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <label className="mr-1" htmlFor="email">Email</label>
              <input type="text" placeholder="Email" name="email" className="text-black mb-2" />
            </div>
            <div className="flex justify-between">
              <label className="mr-1" htmlFor="password">Password</label>
              <input type="password" placeholder="Password" name="password" className="text-black mb-2" />
            </div>
            <input type="submit" value="Submit" className="py-1 px-2 bg-lightGray text-xs" />
          </div>
        </form>
        {errors.length > 0 && <FormErrors errors={errors} />}
      </div>
    </>
  );
}

export default UserLogin;