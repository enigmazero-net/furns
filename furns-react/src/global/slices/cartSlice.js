import {v4 as uuid} from "uuid";
import {createSlice} from "@reduxjs/toolkit";

const getVariationKey = (item = {}) => item.variations?.id || item.variations?.title || "default";

const getCartItemKey = (item = {}) => `${item.id}-${getVariationKey(item)}`;

const toCartItem = (product) => ({
    cartId: uuid(),
    id: product.id,
    title: product.title,
    handle: product.handle,
    images: {
        edges: product.images?.edges?.slice(0, 1) || [],
    },
    variants: {
        edges: product.variants?.edges?.map(({node}) => ({
            node: {
                id: node?.id,
                quantityAvailable: node?.quantityAvailable,
            },
        })) || [],
    },
    price: product.price,
    quantity: product.quantity,
    variations: product.variations,
});

export const cartSlice = createSlice({
    name: 'shoppingCart',
    initialState: [],
    reducers: {
        addToCart: {
            reducer: (state, action) => {
                const product = action.payload;
                const productInCart = state.find(item => getCartItemKey(item) === getCartItemKey(product));

                if (productInCart) {
                    const cartProductIndex = state.findIndex(item => getCartItemKey(item) === getCartItemKey(product));
                    state[cartProductIndex].quantity = state[cartProductIndex].quantity + product.quantity;
                } else {
                    return [product, ...state];
                }
            },
            prepare: (product) => ({
                payload: toCartItem(product),
            }),
        },

        removeCart: (state, action) => {
            const product = action.payload;
            return state.filter(item => item.cartId !== product.cartId);
        },

        increment: (state, action) => {
            const product = action.payload;
            const isIncrementProduct = state.find(item => item?.cartId === product?.cartId);

            if (isIncrementProduct) {
                const incrementProductIndex = state.findIndex(item => item.cartId === product.cartId);
                state[incrementProductIndex].quantity += 1;

                return state;
            } else {
                return state;
            }
        },

        decrement: (state, action) => {
            const product = action.payload;
            const isDecrementProduct = state.find(item => item.cartId === product.cartId);

            if (isDecrementProduct) {
                const decrementProductIndex = state.findIndex(item => item.cartId === product.cartId);
                state[decrementProductIndex].quantity -= 1;
                return state;
            } else {
                return state;
            }
        },

        clear: () => {
            return [];
        }
    }
})

const {reducer, actions} = cartSlice;
export const {addToCart, removeCart, increment, decrement, clear} = actions;
export default reducer;
