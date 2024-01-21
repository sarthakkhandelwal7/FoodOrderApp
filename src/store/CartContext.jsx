import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

const cart_reducer = function cart_reducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const existing_cart_item_index = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updated_items = [...state.items];

        if (existing_cart_item_index > -1) {
            const existing_item = state.items[existing_cart_item_index];
            const updated_item = {
                ...existing_item,
                quantity: existing_item.quantity + 1,
            };

            updated_items[existing_cart_item_index] = updated_item;
        } else {
            updated_items.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updated_items };
    }

    if (action.type === "REMOVE_ITEM") {
        const updated_items = [...state.items];
        const existing_cart_item_index = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existing_item = state.items[existing_cart_item_index];

        if (existing_item.quantity === 1) {
            updated_items.splice(existing_cart_item_index, 1);
        } else {
            const updated_item = {
                ...existing_item,
                quantity: existing_item.quantity - 1,
            };

            updated_items[existing_cart_item_index] = updated_item;
        }

        return { ...state, items: updated_items };
    }

    if (action.type === "CLEAR_CART") {
        return { ...state, items: [] };
    }

    return state;
};

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cart_reducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({ type: "ADD_ITEM", item: item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: "REMOVE_ITEM", id: id });
    }

    function clearCart() {
        dispatchCartAction({ type: "CLEAR_CART" });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
