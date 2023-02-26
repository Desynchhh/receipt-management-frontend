import { FormEvent, useState, useContext } from "react";
import { IContext, UserObject, HttpPostResponse } from "../../@types/receipt-manager";
import { buildFormData, FormErrors } from "../../components/Form";
import Context from "../../Context";


const UserNew = () => {
  document.title = "Budgeze - Sign up";
  const context = useContext(Context) as IContext;
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = buildFormData(e.target as HTMLFormElement);

    const res = await fetch(`${context.apiUrl}/users/create`, {
      method: "post",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    const data: HttpPostResponse<UserObject, never[]> = await res.json();

    if (data.Failure) {
      setErrors(data.Failure);
    }
  }

  return (
    <>
      <legend className="text-3xl mb-3">Fill out the form to get started!</legend>
      <div className="flex flex-col mx-auto w-1/3">
        <form method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <label className="mr-1" htmlFor="firstName">First name</label>
              <input type="text" placeholder="First name" name="firstName" className="text-black mb-2 shadow-pink-400" />
            </div>
            <div className="flex justify-between">
              <label className="mr-1" htmlFor="lastName">Last name</label>
              <input type="text" placeholder="Last name" name="lastName" className="text-black mb-2" />
            </div>
            <div className="flex justify-between">
              <label className="mr-1" htmlFor="email">Email</label>
              <input type="text" placeholder="Email" name="email" className="text-black mb-2" />
            </div>
            <div className="flex justify-between">
              <label className="mr-1" htmlFor="password">Password</label>
              <input type="password" placeholder="Password" name="password" className="text-black mb-2" />
            </div>
            <div className="flex justify-between">
              <label className="mr-1" htmlFor="passwordConfirm">Confirm password</label>
              <input type="password" placeholder="Confirm password" name="passwordConfirm" className="text-black mb-2" />
            </div>
            <input type="submit" value="Submit" className="py-1 px-2 bg-lightGray text-xs" />
          </div>
        </form>
      {errors.length > 0 && <FormErrors errors={errors} />}
      </div>
    </>
  );
}

export default UserNew;