import {addToCart, removeCart, increment, decrement, clear} from "@slices/cartSlice";
import {addCartItem} from "@services/api";
import {getAccessToken} from "@services/auth";

export const addToCartAction = (payload) => async (dispatch) => {
    dispatch(addToCart(payload));

    const token = getAccessToken();
    if (token) {
        try {
            await addCartItem(token, payload);
        } catch {
            // Keep the local cart usable if the protected cart API rejects the request.
        }
    }
}

export const removeCartAction = (payload) => (dispatch) => {
    dispatch(removeCart(payload));
}

export const incrementCartQuantityAction = (payload) => (dispatch) => {
    dispatch(increment(payload));
}

export const decrementCartQuantityAction = (payload) => (dispatch) => {
    dispatch(decrement(payload));
}

export const clearCartAction = () => (dispatch) => {
    dispatch(clear());
}
