import { useState, useRef, useEffect } from "react";
import { ReceiptItem, UserDetails } from "../../@types/receipt-manager";
import { Contributor } from "./Contributor";

interface Props {
  addItem: Function,
}

const testUsers: UserDetails[] =[
  {
    id: 1,
    firstName: "Mikkel",
    lastName: "Larsen",
    email: "mikkellarsen939@gmail.com"
  },
  {
    id: 2,
    firstName: "Thea",
    lastName: "Johansen",
    email: "thea-johansen@outlook.com"
  },
];

export const ItemForm = (props:React.PropsWithChildren<Props>) => {

  const [friends, setFriends] = useState<UserDetails[]>(testUsers);
  const [contributors, setContributors] = useState<UserDetails[]>([]);
  const contributorRef = useRef<HTMLSelectElement>(null);
  const productRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const discountRef = useRef<HTMLInputElement>(null);

  const addContributor = () => {
    try {
      if(contributorRef.current === undefined || contributorRef.current === null ) {
        throw new Error("Element not found.", {
          cause: "Select element not found."
        });
      }

      const selectedContributorId = Number(contributorRef.current.value);
      if(!selectedContributorId) {
        throw new Error("No contributor selected.", {
          cause: "No contributor selected."
        });
      }
      
      const hasContributor = contributors.some(contributor => contributor.id === selectedContributorId);
      if(!hasContributor) {
        const newContributor: UserDetails = friends.filter(friend => friend.id === selectedContributorId)[0];
        setFriends(prevFriends => prevFriends.filter(friend => friend.id !== newContributor.id));
        setContributors(prevContributors => [...prevContributors, newContributor]);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const removeContributor = (id: number): void => {
    const friend = contributors.filter(contributor => contributor.id === id)[0];
    setContributors(prevContributors => prevContributors.filter(contributor => contributor.id !== id));
    setFriends(prevFriends => [...prevFriends, friend]);
  }

  return(
    <>
      <form className="w-full max-w-2/3" onSubmit={(e) => props.addItem(e, contributors, productRef.current?.value, priceRef.current?.value, discountRef.current?.value)}>
        <div className="flex flex-col mb-2">
          <div className="flex flex-col mb-1">
            <label className="mr-1 font-bold" htmlFor="product">Product name</label>
            <input className="text-black mb-2" ref={productRef} type="text" placeholder="Product name" name="product" />
          </div>
          <div className="flex flex-col mb-1">
            <label className="mr-1 font-bold" htmlFor="price">Price</label>
            <input className="text-black mb-2" ref={priceRef} type="text" placeholder="Price" name="price" />
          </div>
          <div className="flex flex-col mb-1">
            <label className="mr-1 font-bold" htmlFor="discount">Discount</label>
            <input className="text-black mb-2" ref={discountRef} type="text" placeholder="Discount" name="discount" />
          </div>
          <div className="flex flex-col mb-2">
            <label className="mr-1 font-bold" htmlFor="discount">Contributors</label>
            <div className="flex justify-between">
              <select 
                name="contributors"
                className="text-lightBlack flex-grow max-w-9/10 mr-2"
                ref={contributorRef}
              >
                <option hidden></option>
                {friends.map(friend => {
                  return(
                    <option key={friend.id} value={friend.id} >{friend.firstName} {friend.lastName} ({friend.email})</option>
                  );
                })}
              </select>
              <button type="button" className="button mb-0 max-w-1/10" onClick={addContributor}>Add person</button>
            </div>
          </div>
          <div className="mb-3">
            {contributors.length > 0 &&
            <ul>
              {contributors.map(contributor => {
                return(
                  <Contributor key={contributor.id} contributor={contributor} onRemove={removeContributor}/>
                );
              })}
            </ul>
            }
          </div>
          <input type="submit" value="Add" className="button" />
        </div>
      </form>
    </>
  );
}
