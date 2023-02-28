import { useState } from "react";

import { Modal } from "../../components/Modal";

const ReceiptNew = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <h1 className="text-3xl">Receipt creator!</h1>
            <button onClick={() => setShowModal((currentState) => !currentState)}>Show modal</button>
            <Modal show={showModal}>
                <legend>I am inside the modal!</legend>
            </Modal>
        </>
    )
}
export default ReceiptNew;