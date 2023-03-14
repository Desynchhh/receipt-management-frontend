import { FormEvent, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Receipt, PostReceipt, ReceiptItem, ReceiptDate, ReceiptDateTime, UserDetails } from "../../@types/receipt-manager";
import { ReceiptForm } from "../../components/receipt/ReceiptForm";
import { ItemForm } from "../../components/receipt/ItemForm";
import { useReceiptContext } from "../../hooks/useReceiptContext";

import { Modal } from "../../components/Modal";

const ReceiptNew = () => {
  const [receiptStore, setReceiptStore] = useState<string>("");
  const [dateBought, setDateBought] = useState<ReceiptDate>("");
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [editItem, setEditItem] = useState<ReceiptItem | null>(null);
  const [showContributorModal, setShowContributorModal] = useState<boolean>(false);
  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [jwt, setJwt, apiUrl] = useReceiptContext();

  const subtotal = useMemo(() => {
    return items.reduce((acc, curr) => {
      acc += (curr.price - curr.discount)
      return acc;
    }, 0);
  }, [items]);

  const onAddItemClick = () => {
    setShowItemModal(true);
    setEditItem(null);
  }

  const onAddItem = (contributors:UserDetails[], product: string, rawPrice: string, rawDiscount?: string):void => {
    const contributorIds = contributors.map(contributor => contributor.id);
    const price = parseFloat(rawPrice.replace(",", ".").trim());
    const discount = rawDiscount ? (parseFloat(rawDiscount.replace(",", ".").trim()) || 0.0) : 0.0;
    const newItem: ReceiptItem = {
      id: items.length == 0 ? 0 : items[items.length-1].id as number + 1,
      product,
      price,
      discount,
      contributorIds
    }
    setItems(prevItems => [...prevItems, newItem]);
    setShowItemModal(false);
  }

  const onEditItem = (id:number):ReceiptItem => {
    return items.filter(item => item.id as number === id)[0];
  }

  const onSaveEdit = (id:number, contributors:UserDetails[], product: string, rawPrice: string, rawDiscount?: string):void => {
    setItems(prevItems => prevItems.map(item => {
      if(item.id === id) {
        const contributorIds = contributors.map(contributor => contributor.id);
        item.product = product;
        item.contributorIds = contributorIds;
        item.price = parseFloat(rawPrice.replace(",", ".").trim());
        item.discount = rawDiscount ? (parseFloat(rawDiscount.replace(",", ".").trim()) || 0.0) : 0.0;
      }
      
      return item
    }));
    setShowItemModal(false);
    setEditItem(null)
  }

  const onRemoveItem = (id:number):void => {
    setItems(prevItems => prevItems.filter(item => item.id as number !== id));
  }

  const validateInputs = ():void => {
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

  const onSubmitReceipt = ():void => {
    validateInputs();

    const receiptItems:ReceiptItem[] = items.map((item) => {
      const {id: _, ...data} = item;
      return data
    });

    const receipt: PostReceipt = {
      store: receiptStore,
      date: `${dateBought}T00:00:00`,
      items: receiptItems,
    };

    fetch(`${apiUrl}/receipts/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Accept": "application/json",
        "Content-Type": "applicaton/json",
      },
      body: JSON.stringify(receipt)
    }).then(res => {
      return res.json();
    }).then(json => {
      return;
    }).catch(e => {
      return console.warn(e);
    });
  }

  const hasEnteredData = receiptStore.length > 0 || dateBought.length > 0;

  return (
    <>
      <h1 className="text-3xl">Receipt creator!</h1>
      <div className="flex justify-between">
        <div className="w-1/2 mr-10">
          <ReceiptForm receiptStore={receiptStore} setReceiptStore={setReceiptStore} dateBought={dateBought} setDateBought={setDateBought} />
          <button className="button" onClick={onAddItemClick}>Add item</button>
          <input type="submit" name="submit" className="button" value="Submit" onClick={onSubmitReceipt} />
        </div>
        <div className="w-full ml-40 border-2 text-center">
          {hasEnteredData &&
            <header className="mt-1 pb-2 border-b-2 border-dashed">
              <p className="text-3xl font-bold">{receiptStore}</p>
              <p>{dateBought}</p>
            </header>
          }
          <div className="receipt-body flex flex-col grow justify-between h-3/5">
            <div className="">
              <div className="flex justify-between mx-3">
                <div className="flex max-w-1/10 w-full ">
                  <p className="mr-2 font-bold">PRODUCT</p>
                </div>
                <div className="flex justify-between w-2/12">
                  <p className="font-bold">PRICE</p>
                  <p className="font-bold">DISCOUNT</p>
                </div>
              </div>
              {items.map(item => {
                return(
                <div key={item.product} className="flex justify-between mx-3">
                  <div className="flex justify-between items-center max-w-1/10 w-full align-middle">
                    <p className="mr-2">{item.product}</p>
                    <FontAwesomeIcon className="text-sm hover:cursor-pointer text-blue-300" icon="pen" onClick={() => {
                        setEditItem(item);
                        setShowItemModal(true);
                      }} />
                    <FontAwesomeIcon className="text-sm hover:cursor-pointer text-red-300" icon="xmark" onClick={() => onRemoveItem(item.id as number)} />
                  </div>
                  <div className="flex justify-between w-2/12">
                    <p className="">{item.price}</p>
                    <p>{item.discount}</p>
                  </div>
                </div>
                );
              })}
            </div>
            <div className="text-left">
              <p className="border-t-2 border-solid p-1 pl-2">Total: {subtotal}</p>
            </div>
          </div>
        </div>
      </div>
      {showItemModal &&
      <Modal title="Add item to receipt" show={showItemModal} setShow={setShowItemModal}>
        <ItemForm addItem={onAddItem} onSave={onSaveEdit} editItem={editItem} />
      </Modal>
      }
    </>
  )
}
export default ReceiptNew;