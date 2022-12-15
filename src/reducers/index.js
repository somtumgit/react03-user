import {combineReducers} from "redux";
import authReducer from "./auth.reducers";
import categoryReducer from "./category.reducers";
import productReducer from "./product.reducers";
import cartReducer from "./cart.reducers";
import userReducer from "./user.reducers";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
});

export default rootReducer;

