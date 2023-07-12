import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'react-bootstrap';

const CartItems = () => {
    const cartItems = useSelector(state => state.cartItems);
    const dispatch = useDispatch();
    const [cartTotal, setCartTotal] = useState([]);

    useEffect(() => {
        let total = 0;
        cartItems.map(cartItem => { total += (cartItem.quantity * cartItem.price); return total });
        setCartTotal(total);
    }, [cartItems]);

    const decreaseqQtyHandler = (id) => {
        let item = cartItems.find(item => item.id === id);
        console.log(item);

        if (item.quantity === 1) {
            dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
        } else {
            dispatch({ type: 'DECREASE_ITEM_QTY', payload: item.id });
        }

        dispatch({ type: 'MINUS_COUNT' });
    }

    const increaseQtyHandler = (id) => {
        dispatch({ type: 'ADD_ITEM_QTY', payload: id });
        dispatch({ type: 'ADD_COUNT' });
    }

    return (
        <div>
            <h2>My Cart</h2>
            <div className="itemContainer d-flex flex-wrap justify-content-center">
                {cartItems.map(cart =>
                    <div className="card p-3 m-1" key={uuidv4()}>
                        <div>
                            <img src={cart.image} alt={cart.name} />
                        </div>
                        <p key={uuidv4()}>{cart.name}</p>
                        <p key={uuidv4()}>Php{cart.price}.00</p>
                        <p key={uuidv4()}>Quantity: {cart.quantity}</p>
                        <div>
                            <Button
                                variant="outline-primary"
                                className="buttons"
                                key={uuidv4()}
                                onClick={() => increaseQtyHandler(cart.id)}>
                                +
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="buttons"
                                key={uuidv4()}
                                onClick={() => decreaseqQtyHandler(cart.id)}>
                                -
                            </Button>
                            <Button
                                variant="danger"
                                className="buttons"
                                key={uuidv4()}
                                onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: cart.id })}>
                                Remove
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <h3>Grand Total: Php {cartTotal}.00</h3>
        </div>
    );
}

export default CartItems;