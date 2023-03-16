import { useState } from "react"
import { ReceiptDate, ReceiptDateTime, receiptDateRegex, receiptDateTimeRegex } from "../../@types/receipt-manager"
import { FormErrors } from "../Form"

interface Props {
  receiptStore: string,
  setReceiptStore: React.Dispatch<React.SetStateAction<string>>,
  dateBought: ReceiptDate,
  setDateBought: React.Dispatch<React.SetStateAction<ReceiptDate>>,
}

const ReceiptForm = (props:React.PropsWithChildren<Props>) => {
  const [errors, setErrors] = useState<string[]>([]);
  
  // Found out there is a "date" type on input elements after writing this...
  const validateDateFormat = () => {
    setErrors([])
    if(props.dateBought.length <= 0) return;

    const isDate = props.dateBought.match(receiptDateRegex);
    const isDateTime = props.dateBought.match(receiptDateTimeRegex);
    if(!isDate && !isDateTime) {
      setErrors(["Date is not in a proper format!\n Please use the format YYYY-MM-DD"]);
    }
  }

  return(
    <>
      <form>
        <div className="flex flex-col mb-2">
          <div className="flex flex-col mb-1">
            <label className="mr-1" htmlFor="store">Store</label>
            <input type="text" placeholder="Store" name="store" value={props.receiptStore} onChange={(e) => props.setReceiptStore(e.target.value)} className="text-black mb-2" />
          </div>
          <div className="flex flex-col mb-1">
            <label className="mr-1" htmlFor="date">Date bought</label>
            <input
              className="text-black mb-2"
              type="date"
              placeholder="Date bought"
              name="date"
              value={props.dateBought}
              onChange={(e) => {
                props.setDateBought(e.target.value as ReceiptDate);
              }}
              onBlur={validateDateFormat}
            />
            {errors.length > 0 && <FormErrors errors={errors} />}
          </div>
        </div>
      </form>
    </>
  );
}

export { ReceiptForm };
