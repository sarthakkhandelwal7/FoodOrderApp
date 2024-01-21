import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import Modal from "./UI/Modal.jsx";
import { currency_formatter } from "../utils/formatting.js";
import Input from "./UI/Input.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";
import useHttp from "../Hooks/useHttp.jsx";

const request_config = {
    method: "POST",
    headers: { "content-type": "application/json" },
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clear_data,
    } = useHttp("http://localhost:3000/orders", request_config, []);

    const cart_total = cartCtx.items.reduce((total_amount, item) => {
        return total_amount + item.quantity * item.price;
    }, 0);

    function handle_close() {
        userProgressCtx.hideCheckout();
    }

    function handle_finish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clear_data();
    }

    function handle_submit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            })
        );
    }

    let action = (
        <>
            <Button type="button" textOnly onClick={handle_close}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );
    if (isSending) {
        action = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal
                open={userProgressCtx.progress === "checkout"}
                onClose={handle_finish}
            >
                <h2>Successs</h2>
                <p>Your Order has been placed</p>
                <p>
                    We will get back to you with more details via email in few
                    Years
                </p>
                <p className="modal-action">
                    <Button onClick={handle_finish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal
            open={userProgressCtx.progress === "checkout"}
            onClose={handle_close}
        >
            <form onSubmit={handle_submit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currency_formatter.format(cart_total)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Failed to place order" error={error} />}
                <p className="modal-actions">{action}</p>
            </form>
        </Modal>
    );
}
