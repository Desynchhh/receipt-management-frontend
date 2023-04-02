import { useState, useEffect } from "react";
import { useReceiptContext } from "../../hooks/useReceiptContext";

import { ReceiptData, HttpPostResponse } from "../../@types";
import { Link } from "react-router-dom";

const ReceiptList = () => {
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [jwt, apiUrl] = useReceiptContext();

  useEffect(() => {
    const controller = new AbortController();
    const url = `${apiUrl}/receipts`;

    const doFetch = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${jwt}`
          },
          signal: controller.signal
        });
        const data: HttpPostResponse<ReceiptData[], string> = await response.json();
        if (data.Success) {
          setReceipts(data.Success);
          console.log(receipts);
          console.log("set receipts!");
          return;
        }
      } catch (err) {
        if (err instanceof DOMException) {
          return;
        }
        console.log(`Something went wrong during GET request to ${url}.`);
        console.error(err);
      }
    }

    doFetch();
    return () => {
      controller.abort();
    }
  }, [apiUrl]);

  return (
    <>
      <h1 className="text-3xl mb-2">Your receipts</h1>
      <ul>
        {receipts.length > 0 &&
          receipts.map(receipt => {
            const store = receipt.store;
            const dateBought = new Date(receipt.dateBought).toISOString().split("T")[0];
            const subtotal = receipt.subtotal.toString().replace(".", ",");
            return (
              <li key={receipt.id} className="mb-2">
                <Link to={`${receipt.id}`}>
                  <p className="text-2xl -mb-1">{store} - <span className="text-lg font-bold">{subtotal},-</span></p>
                  <small>{dateBought}</small>
                </Link>
              </li>
            );
          })
        }
      </ul>
    </>
  );
}

export default ReceiptList;
