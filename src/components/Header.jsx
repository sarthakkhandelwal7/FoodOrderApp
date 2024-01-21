import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
    const cartCxt = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const total_cart_items = cartCxt.items.reduce(
        (total_number_of_items, item) => {
            return total_number_of_items + item.quantity;
        },
        0
    );

    function handle_cart_show() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src="logo.jpg" alt="Logo" />
                <h1 id="title">REACTFOOD</h1>
            </div>
            <nav>
                <Button textOnly onClick={handle_cart_show}>
                    Cart ({total_cart_items})
                </Button>
            </nav>
        </header>
    );
}
