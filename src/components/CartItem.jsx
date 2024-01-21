import { useContext } from "react";
import { currency_formatter } from "../utils/formatting";

export default function CartItem({
    price,
    name,
    quantity,
    onIncrease,
    onDecrease,
}) {
    function handle_add_item() {
        cartCtx.addItem();
    }
    return (
        <li className="cart-item">
            <p>
                {name} - {quantity} x {currency_formatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );
}
