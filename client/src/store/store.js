import authReducer from "./auth-slice/index";
import { configureStore } from "@reduxjs/toolkit";
import adminProductsSlice from "./admin-slice/index";
import shopCartSlice from "./shop/cart-slice/index";
import shopProductsSlice from "./shop/products-slice/index";
import reviewSlice from "./shop/review-slice/index";
import shopOrderSlice from "./shop/order-slice/index";
import commonSlice from "./shop/common-slice/index";
import searchSlice from "./shop/search-slice/index";
import addressSlice from "./shop/address-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,

    shopCart: shopCartSlice,
    shopProducts: shopProductsSlice,
    shopReview: reviewSlice,
    shopOrder: shopOrderSlice,
    shopSearch: searchSlice,
    shopAddress: addressSlice,

    commonFeature: commonSlice,
  },
});

export default store;
