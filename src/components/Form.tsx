interface Props {
  errors: string[]
}



const buildFormData = (formElement: HTMLFormElement): URLSearchParams => {
  const formData = new URLSearchParams();
  for (let pair of new FormData(formElement)) {
    if (typeof pair[1] === "string") {
      formData.append(pair[0], pair[1]);
    }
  }
  return formData;
}

const FormErrors = (props: Props) => {
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

export { buildFormData, FormErrors };