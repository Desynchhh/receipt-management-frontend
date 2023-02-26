import { FormEvent, useState } from "react";

import { buildFormData, FormErrors } from "../../components/Form";

interface UserObject {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  apiToken?: string,
  createdAt: string,
  updatedAt: string,
  isDeleted: boolean
}

interface CreateUserResponse {
  Failure?: never[],
  Success?: UserObject
}

const UserNew = () => {
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = buildFormData(e.target as HTMLFormElement);

    const res = await fetch("http://localhost:8080/apiv2/users/create", {
      method: "post",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    const data: CreateUserResponse = await res.json();
    console.log(data);

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