import { currency_formatter } from "../utils/formatting";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import Button from "./UI/Button";

export default function MealItem({ meal }) {
    const cartCxt = useContext(CartContext);

    function handle_add_meal_to_cart() {
        cartCxt.addItem(meal);
    }
    return (
        <li className="meal-item">
            <article>
                <img
                    src={`http://localhost:3000/${meal.image}`}
                    alt={meal.name}
                />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">
                        {currency_formatter.format(meal.price)}
                    </p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handle_add_meal_to_cart}>
                        Add to Cart
                    </Button>
                </p>
            </article>
        </li>
    );
}
