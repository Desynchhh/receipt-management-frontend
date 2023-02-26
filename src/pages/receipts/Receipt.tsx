import { useParams } from "react-router-dom";

const Receipt = () => {
    const { id } = useParams();
    return (
        <h1>Receipt {id}</h1>
    );
}

export default Receipt;