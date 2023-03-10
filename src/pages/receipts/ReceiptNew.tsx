import { FormEvent, useMemo, useState } from "react";

import { Receipt, PostReceipt, ReceiptItem, ReceiptDate, ReceiptDateTime, UserDetails } from "../../@types/receipt-manager";
import { ReceiptForm } from "../../components/receipt/ReceiptForm";
import { ItemForm } from "../../components/receipt/ItemForm";

import { Modal } from "../../components/Modal";

const ReceiptNew = () => {
  const [receiptStore, setReceiptStore] = useState<string>("");
  const [dateBought, setDateBought] = useState<ReceiptDate>("");
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [showContributorModal, setShowContributorModal] = useState<boolean>(false);
  const [showItemModal, setShowItemModal] = useState<boolean>(false);

  const subtotal = useMemo(() => {
    console.log(items);
    return items.reduce((acc, curr) => {
      acc += (curr.price - curr.discount)
      return acc;
    }, 0);
  }, [items]);

  const onAddItem = (e: FormEvent<HTMLFormElement>, contributors:UserDetails[], product: string, rawPrice: string, rawDiscount?: string) => {
    e.preventDefault();
    console.log("ran onAddItem!");
    const contributorIds = contributors.map(contributor => contributor.id);
    const price = parseFloat(rawPrice.replace(",", ".").trim());
    const discount = rawDiscount ? (parseFloat(rawDiscount.replace(",", ".").trim()) || 0.0) : 0.0;
    const newItem: ReceiptItem = {
      product,
      price,
      discount,
      contributors: contributorIds
    }
    setItems(prevItems => [...prevItems, newItem]);
    // const formElement = e.currentTarget;
    // const data: Map<string, string | number[]> = new Map();
    // for (let pair of new FormData(formElement)) {
    //   if (typeof pair[1] === "string") {
    //     data.set(pair[0], pair[1]);
    //   }
    // }
    // data.set("contributors", contributorIds);
    // console.log(data);
    // setShowItemModal(false);
  }

  const validateInputs = () => {
    if(receiptStore.length <= 0) {
      throw new Error("No store entered!");
    }
  
    if(dateBought.length <= 0) {
      throw new Error("No date selected!");
    }
  
    if(items.length <= 0) {
      throw new Error("Receipt has no items!");
    }
  }

  const onSubmitReceipt = () => {
    validateInputs();

    const receipt: PostReceipt = {
      store: receiptStore,
      date: dateBought,
      items: items
    };
    console.log(receipt);
  }

  const hasEnteredData = receiptStore.length > 0 || dateBought.length > 0;

  return (
    <>
      <h1 className="text-3xl">Receipt creator!</h1>
      <div className="flex justify-between">
        <div className="w-1/2 mr-10">
          <ReceiptForm receiptStore={receiptStore} setReceiptStore={setReceiptStore} dateBought={dateBought} setDateBought={setDateBought} />
          <button className="button" onClick={() => setShowItemModal(true)}>Add item</button>
          <input type="submit" name="submit" className="button" value="Submit" onClick={onSubmitReceipt} />
        </div>
        <div className="w-full ml-40 border-2 text-center">
          {hasEnteredData &&
            <div className="mt-1 pb-2 border-b-2 border-dashed">
              <p className="text-3xl font-bold">{receiptStore}</p>
              <p>{dateBought}</p>
            </div>
          }
          {items.map(item => {
            return(
            <div key={item.product} className="flex justify-between mx-3">
              <div className="flex max-w-1/10 w-full">
                <p className="mr-2">{item.product}</p><span className="underline">edit</span>
              </div>
              <div className="flex justify-between w-2/12">
                <p>{item.price}</p>
                <p>{item.discount}</p>
              </div>
            </div>
            );
          })}
          <p className="border-t-2 border-solid">Subtotal: {subtotal}</p>
        </div>
      </div>
      {showItemModal &&
      <Modal title="Add item to receipt" show={showItemModal} setShow={setShowItemModal}>
        <ItemForm addItem={onAddItem} />
      </Modal>
      }
    </>
  )
}
export default ReceiptNew;