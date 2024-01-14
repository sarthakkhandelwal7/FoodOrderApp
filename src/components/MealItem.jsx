import { currency_formatter } from "../utils/formatting";
import Button from "./UI/Button";

export default function MealItem({ name, price, description, image }) {
    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${image}`} alt={name} />
                <div>
                    <h3>{name}</h3>
                    <p className="meal-item-price">{currency_formatter.format(price)}</p>
                    <p className="meal-item-description">{description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}
