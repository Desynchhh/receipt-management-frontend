interface ErrorProps {
  errors: string[]
}

interface SuccessProps {
  message: string
}



export const buildFormData = (formElement: HTMLFormElement): URLSearchParams => {
  const formData = new URLSearchParams();
  for (let pair of new FormData(formElement)) {
    if (typeof pair[1] === "string") {
      formData.append(pair[0], pair[1]);
    }
  }
  return formData;
}

export const FormErrors = (props:React.PropsWithChildren<ErrorProps>) => {
  return (
    <>
      <div className="bg-red-200 text-red-500 p-2 mt-3">
        {props.errors.map(error => {
          return (
            <p key={error}>{error}</p>
          );
        })}
      </div>
    </>
  )
}

export const FormSuccess = (props:React.PropsWithChildren<SuccessProps>) => {
  return (
    <>
      <div className="bg-green-200 text-green-500 p-2 mt-3">
        <p>{props.message}</p>
      </div>
    </>
  )

}
