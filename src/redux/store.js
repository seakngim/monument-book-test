import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices/BookSlice";
import NewsSlices from "./slices/NewsSlices.js";
import  AuthorSlices  from "./slices/AuthorSlice.js";
import CategorySlice from "./slices/CategorySlice.js";
import CartSlice from "./slices/CartSlice.js";
import BookmarkSlice from "./slices/BookmarkSlice.js";
import MyOrderSlice from "./slices/MyOrderSlice.js";
import  UserProfileSlice  from "./slices/UserProfileSlice.js";
import SupplierSlice from "./slices/SupplierSlice.js";
import CreditCardSlice from "./slices/CreditCardSlice.js";
export const store = configureStore({
    reducer: {
       book: bookSlice,
       news: NewsSlices,
       author: AuthorSlices,
       category: CategorySlice,
       cart: CartSlice,
       bookmark: BookmarkSlice,
       orther: MyOrderSlice,
       userprofile: UserProfileSlice,
       supplier: SupplierSlice,
       creditCard: CreditCardSlice,
    }
});
export default store;