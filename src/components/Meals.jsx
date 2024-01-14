import { useEffect } from "react";
import { useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetch_meals() {
            const response = await fetch("http://localhost:3000/meals");
            if (!response.ok) {
                // ...
            }

            const meals = await response.json();
            setLoadedMeals(() => meals);
        }
        fetch_meals();
    }, []);

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem id={meal.key} {...meal} />
            ))}
        </ul>
    );
}
