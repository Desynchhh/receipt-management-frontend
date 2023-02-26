import { Link } from "react-router-dom";

const ReceiptList = () => {
  return (
    <>
      <h1 className="text-3xl">Receipt List</h1>
      <ul>
        <li>
          <Link to="/receipts/1">Super brugsen</Link>
        </li>
        <li>
          <Link to="/receipts/2">Coop</Link>
        </li>
      </ul>
    </>
  );
}

export default ReceiptList;
