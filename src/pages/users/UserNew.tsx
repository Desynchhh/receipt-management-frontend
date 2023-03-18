import { FormEvent, useState } from "react";
import { FullUserObject, HttpPostResponse } from "../../@types/receipt-manager";
import { buildFormData, FormErrors, FormSuccess } from "../../components/Form";
import { useReceiptContext } from "../../hooks/useReceiptContext";


const UserNew = () => {
  document.title = "Budgeze - Sign up";
  const [jwt, apiUrl] = useReceiptContext();
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsDisabled(true);
    setMessage("");
    setErrors([]);
    const form = e.currentTarget;
    const formData = buildFormData(form);

    try {
      const res = await fetch(`${apiUrl}/users/create`, {
        method: "post",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });
      const data: HttpPostResponse<FullUserObject, string[]> = await res.json();

      if (data.Failure) {
        setErrors(data.Failure);
      }
      else if (data.Success) {
        setMessage("User created successfully! You can now log in!");
        for (let input of form.querySelectorAll("input[type=text],input[type=password]") as NodeListOf<HTMLInputElement>) {
          input.value = "";
        }
      }
    } catch (error) {
      if (error instanceof TypeError) {
        if (error.message.includes("NetworkError")) {
          setErrors(["Could not connect to server."]);
        }
      } else {
        setErrors(["Could not create user. Try again later."]);
      }
    } finally {
      setIsDisabled(false);
    }
  }

  return (
    <>
      <legend className="text-3xl mb-3">Fill out the form to get started!</legend>
      <div className="flex flex-col mx-auto w-1/3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <label className="mr-1" htmlFor="firstName">First name</label>
              <input type="text" placeholder="First name" name="firstName" className="text-black mb-2" />
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
            <input type="submit" value="Submit" disabled={isDisabled} className="py-1 px-2 bg-lightGray text-xs" />
          </div>
        </form>
        {errors.length > 0 && <FormErrors errors={errors} />}
        {message.length > 0 && <FormSuccess message={message} />}
      </div>
    </>
  );
}

export default UserNew;