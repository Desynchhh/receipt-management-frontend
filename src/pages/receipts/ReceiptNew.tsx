import { useMemo, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  PostReceipt,
  ReceiptItem,
  ReceiptDate,
  ReceiptDateTime,
  UserDetails,
  ContributorSubtotal,
} from "../../@types/receipt-manager";
import { ReceiptForm } from "../../components/receipt/ReceiptForm";
import { ItemForm } from "../../components/receipt/ItemForm";
import { useReceiptContext } from "../../hooks/useReceiptContext";

import { Modal } from "../../components/Modal";

interface Props {
  friends: UserDetails[];
}

const ReceiptNew = (props: Props) => {
  const [jwt, apiUrl] = useReceiptContext();
  if (!jwt) {
    window.location.replace("/");
  }

  const [friends, setFriends] = useState<UserDetails[]>(props.friends);
  const [receiptStore, setReceiptStore] = useState<string>("");
  const [dateBought, setDateBought] = useState<ReceiptDate>(
    new Date().toISOString().split("T")[0] as ReceiptDate
  );
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [editItem, setEditItem] = useState<ReceiptItem | null>(null);
  const [showItemModal, setShowItemModal] = useState<boolean>(false);

  const [subtotal, contributorSubtotals]: [number, ContributorSubtotal[]] =
    useMemo(() => {
      const subtotal = items.reduce(calcSubtotal, 0);

      const contributorIds = items
        .map((item) => item.contributorIds)
        .flat()
        .filter((value, index, array) => array.indexOf(value) === index);

      const contributors = props.friends.filter((friend) =>
        contributorIds.includes(friend.id)
      );

      const contributorSubtotals: ContributorSubtotal[] = contributors.reduce<
        ContributorSubtotal[]
      >((acc, curr) => processContributorSubtotals(acc, curr, items), []);

      console.log(contributorSubtotals);

      return [subtotal, contributorSubtotals];
    }, [items]);


  const onSetStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiptStore(e.target.value);
  }

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateBought(e.target.value as ReceiptDate);
  }

  const onAddItemClick = (): void => {
    setShowItemModal(true);
    setEditItem(null);
  };

  const onAddItem = (
    contributors: UserDetails[],
    product: string,
    rawPrice: string,
    rawDiscount?: string
  ): void => {
    const contributorIds = contributors.map((contributor) => contributor.id);
    const price = parseFloat(rawPrice.replace(",", ".").trim());
    const discount = rawDiscount
      ? parseFloat(rawDiscount.replace(",", ".").trim()) || 0.0
      : 0.0;
    const newItem: ReceiptItem = {
      id: items.length == 0 ? 0 : (items[items.length - 1].id as number) + 1,
      product,
      price,
      discount,
      contributorIds,
    };
    setItems((prevItems) => [...prevItems, newItem]);
    setShowItemModal(false);
  };

  const onSaveEdit = (
    id: number,
    contributors: UserDetails[],
    product: string,
    rawPrice: string,
    rawDiscount?: string
  ): void => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const contributorIds = contributors.map(
            (contributor) => contributor.id
          );
          item.product = product;
          item.contributorIds = contributorIds;
          item.price = parseFloat(rawPrice.replace(",", ".").trim());
          item.discount = rawDiscount
            ? parseFloat(rawDiscount.replace(",", ".").trim()) || 0.0
            : 0.0;
        }

        return item;
      })
    );
    setShowItemModal(false);
    setEditItem(null);
  };

  const onRemoveItem = (id: number): void => {
    setItems((prevItems) =>
      prevItems.filter((item) => (item.id as number) !== id)
    );
  };

  const validateInputs = (): void => {
    if (receiptStore.length <= 0) {
      throw new Error("No store entered!");
    }

    if (dateBought.length <= 0) {
      throw new Error("No date selected!");
    }

    if (items.length <= 0) {
      throw new Error("Receipt has no items!");
    }
  };

  const onSubmitReceipt = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    validateInputs();

    const receiptItems: ReceiptItem[] = items.map((item) => {
      const { id: _, ...data } = item;
      return data;
    });

    const receipt: PostReceipt = {
      store: receiptStore,
      // SQLite requires DateTime fields to also include the time, but time does not matter for this application.
      date: `${dateBought}T00:00:00`,
      items: receiptItems,
    };

    fetch(`${apiUrl}/receipts/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "applicaton/json",
      },
      body: JSON.stringify(receipt),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
      })
      .catch((e) => {
        return console.warn(e);
      });
  };

  const displayStore = receiptStore || "[Store]";

  return (
    <>
      <h1 className="text-3xl">Receipt creator!</h1>
      <div className="flex justify-between">
        <div className="w-1/2 mr-10">
          <ReceiptForm
            receiptStore={receiptStore}
            onSetStore={onSetStore}
            dateBought={dateBought}
            onChangeDate={onChangeDate}
            onAddItem={onAddItemClick}
            onSubmit={onSubmitReceipt}
          />
        </div>
        <div className="w-full ml-40 border-2 text-center">
          <header className="mt-1 pb-2 border-b-2 border-dashed">
            <p className="text-3xl font-bold">{displayStore}</p>
            <p>{dateBought}</p>
          </header>
          <div className="receipt-body flex flex-col grow justify-between h-3/5">
            <div className="mb-2">
              <div className="flex justify-between mx-3">
                <div className="flex max-w-1/10 w-full ">
                  <p className="mr-2 font-bold">PRODUCT</p>
                </div>
                <div className="flex justify-between w-2/12">
                  <p className="font-bold">PRICE</p>
                  <p className="font-bold">DISCOUNT</p>
                </div>
              </div>
              {items.map((item) => {
                return (
                  <div key={item.product} className="flex justify-between mx-3">
                    <div className="flex justify-between items-center max-w-1/10 w-full align-middle">
                      <p className="mr-2">{item.product}</p>
                      <FontAwesomeIcon
                        className="text-sm hover:cursor-pointer text-blue-300"
                        icon="pen"
                        onClick={() => {
                          setEditItem(item);
                          setShowItemModal(true);
                        }}
                      />
                      <FontAwesomeIcon
                        className="text-sm hover:cursor-pointer text-red-300"
                        icon="xmark"
                        onClick={() => onRemoveItem(item.id as number)}
                      />
                    </div>
                    <div className="flex justify-between w-2/12">
                      <p className="">{item.price}</p>
                      <p>{item.discount}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-left border-t-2 border-solid p-1 pl-2">
              {contributorSubtotals.length > 0 &&
                contributorSubtotals.map((contributorSubtotal) => {
                  return (
                    <p key={contributorSubtotal.contributor.id}>
                      {contributorSubtotal.contributor.firstName}'s share:{" "}
                      {contributorSubtotal.subtotal}
                    </p>
                  );
                })}
              <p className="mt-2">Subtotal: {subtotal}</p>
            </div>
          </div>
        </div>
      </div>
      {showItemModal && (
        <Modal
          title="Add item to receipt"
          show={showItemModal}
          setShow={setShowItemModal}
        >
          <ItemForm
            friends={friends}
            addItem={onAddItem}
            onSave={onSaveEdit}
            editItem={editItem}
          />
        </Modal>
      )}
    </>
  );
};

const calcSubtotal = (subtotal: number, item: ReceiptItem) => {
  subtotal += item.price - item.discount;
  return subtotal;
};

const calcContributorTotal = (totalContribution: number, item: ReceiptItem) => {
  if (!item.contributorIds) {
    return totalContribution;
  }

  totalContribution += (item.price - item.discount) / item.contributorIds.length;
  return totalContribution;
};

const processContributorSubtotals = (
  subtotals: ContributorSubtotal[],
  contributor: UserDetails,
  items: ReceiptItem[]
) => {
  const contributorItems = items.filter((item) =>
    item.contributorIds?.includes(contributor.id)
  );

  const total = contributorItems.reduce(calcContributorTotal, 0);

  subtotals.push({
    contributor: contributor,
    subtotal: total,
  });
  return subtotals;
};

export default ReceiptNew;
