import { cartConstants } from "../actions/constants";

const initState = {
    cartItems: {
        // 123: {
        //     _id: 123,
        //     name: 'Sumsung mobile',
        //     img: 'some.jpg',
        //     price: 200,
        //     qty: 1,
        // }
    },
    carts: [],
    message: '',
    error: null,
    loading: false
}

export default function(state = initState,action) {
    // console.log(action);
    switch(action.type) {
        case cartConstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                message: '',
                error: '',
                loading: true,
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                carts: action.payload.cart,
                // message: action.payload.message,
                error: null,
                loading: false,
            }
            break;
        case cartConstants.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                message: '',
                error: action.payload.error,
                loading: false,
                
            }
            break;


        case cartConstants.GET_ALL_CART_REQUEST:
            state = {
                ...state,
                message: '',
                error: '',
                loading: true,
            }
            break;
        case cartConstants.GET_ALL_CART_SUCCESS:
            state = {
                ...state,
                cartItems: action.payload.cartItems,
                // message: action.payload.message,
                error: null,
                loading: false,
            }
            break;
        case cartConstants.GET_ALL_CART_FAILURE:
            state = {
                ...state,
                message: '',
                error: action.payload.error,
                loading: false,
                
            }
            break;


        case cartConstants.UPDATE_CART_REQUEST:
            state = {
                ...state,
                message: '',
                error: '',
                loading: true,
            }
            break;
        case cartConstants.UPDATE_CART_SUCCESS:
            state = {
                ...state,
                // cartItems: action.payload.cartItems,
                message: action.payload.message,
                error: null,
                loading: false,
            }
            break;
        case cartConstants.UPDATE_CART_FAILURE:
            state = {
                ...state,
                message: '',
                error: action.payload.error,
                loading: false,
                
            }
            break;
            
        case cartConstants.RESET_CART:
            state = {
                ...initState
            }
            break;

        case cartConstants.REMOVE_CART_ITEM_REQUEST:
            state = {
                ...state,
                message: '',
                error: '',
                loading: true,
            }
            break;
        case cartConstants.REMOVE_CART_ITEM_SUCCESS:
            state = {
                ...state,
                // cartItems: action.payload.cartItems,
                // message: action.payload.message,
                error: null,
                loading: false,
            }
            break;
        case cartConstants.REMOVE_CART_ITEM_FAILURE:
            state = {
                ...state,
                message: '',
                error: action.payload.error,
                loading: false,
                
            }
            break;
    }

   return state;
}