import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
function App() {
    return (
        <UserProgressContextProvider>
            <CartContextProvider>
                <Header />
                <Meals />
                <Cart />
                <Checkout />
            </CartContextProvider>
        </UserProgressContextProvider>
    );
}

export default App;
