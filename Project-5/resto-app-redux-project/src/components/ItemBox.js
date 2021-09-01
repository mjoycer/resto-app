import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import EditForm from "./EditForm";

const ItemBox = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const items = useSelector(state => state.filteredItems);
    const cartItems = useSelector(state => state.cartItems);
    const selectedItem = useSelector(state => state.selectedItem);
    const dispatch = useDispatch();


    const onClickEdit = (e) => {
        setShowEditModal(true);
        dispatch({ type: 'EDIT_ITEM', payload: e });
    }

    const saveChangesHandler = (e) => {
        e.preventDefault();
        setShowEditModal(false);
        dispatch({ type: 'SAVE_CHANGES', payload: selectedItem });
    }

    const onClickOrder = (e) => {
        let found = cartItems.find(cart => cart.id === e);
        if (found) {
            dispatch({ type: 'ADD_ITEM_QTY', payload: e });

        } else {
            dispatch({ type: 'ADD_TO_CART', payload: e });
        }

        dispatch({ type: 'ADD_COUNT' });

    }

    return (
        <div className="itemContainer d-flex flex-wrap justify-content-center">
            {items.map(item =>
                <div key={uuidv4()} className="card p-2 m-1">
                    <div key={uuidv4()}>
                        <img key={uuidv4()} src={item.image} alt={item.name} />
                    </div>
                    <div key={uuidv4()} className="itemInfo">
                        <strong key={uuidv4()}>{item.name}</strong>
                        <p key={uuidv4()}><small key={uuidv4()} >Php {item.price}.00</small></p>
                        <div key={uuidv4()}>
                            <Button
                                className="buttons"
                                key={uuidv4()}
                                value={item.id}
                                onClick={(e) => onClickOrder(e.target.value)}>
                                Order
                            </Button>
                            <Button
                                className="buttons"
                                key={uuidv4()}
                                value={item.id}
                                onClick={(e) => onClickEdit(e.target.value)}>
                                Edit
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="buttons"
                                key={uuidv4()}
                                onClick={() => { dispatch({ type: 'REMOVE_ITEM', payload: item.id }) }}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Modal
                show={showEditModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(e) => saveChangesHandler(e)}>Save Changes</Button>
                    <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>

        </div>


    )
}

export default ItemBox;