import useHttp from "../Hooks/useHttp.jsx";
import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";

const request_config = {};
export default function Meals() {
    const {
        data: loadedMeals,
        isLoading,
        error,
    } = useHttp("http://localhost:3000/meals", request_config, []);

    if (isLoading) {
        return <p className="center">Featching Meals...</p>;
    }

    if (error) {
        console.log("in if block");
        return <Error title="Unable to featch meal items" message={error} />;
    }
    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}
