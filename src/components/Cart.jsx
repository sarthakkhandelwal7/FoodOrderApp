import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currency_formatter } from "../utils/formatting.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cart_total = cartCtx.items.reduce((total_amount, item) => {
        return total_amount + item.quantity * item.price;
    }, 0);

    function handle_close_cart() {
        userProgressCtx.hideCart();
    }

    function handle_go_to_checkout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={userProgressCtx.progress === "cart"}
            onClose={
                userProgressCtx.progress === "cart" ? handle_close_cart : null
            }
        >
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        {...item}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                        onIncrease={() => cartCtx.addItem(item)}
                    />
                ))}
            </ul>
            <p className="cart-total">
                {currency_formatter.format(cart_total)}
            </p>
            <p className="modal-actions">
                <Button textOnly onClick={handle_close_cart}>
                    Close
                </Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handle_go_to_checkout}>
                        Go to Checkout
                    </Button>
                )}
            </p>
        </Modal>
    );
}
