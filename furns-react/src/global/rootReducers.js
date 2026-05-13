import cartReducer from "@slices/cartSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  shoppingCart: cartReducer,
});
