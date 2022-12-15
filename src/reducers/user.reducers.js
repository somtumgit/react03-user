import { userConstants } from '../actions/constants';

const initState = {
    address: [],
    orders: [],
    orderDetails: {},
    error: null,
    loading: false,
    orderFetching: false,
    placedOrderId: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initState,action) {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case userConstants.GET_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.GET_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                error: null,
                loading: false
            }
            break;
        case userConstants.GET_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case userConstants.ADD_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.ADD_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                error: null,
                loading: false,
            };
            break;
        case userConstants.ADD_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case userConstants.RESET_USER_ADDRESS:
            state = {
                ...state,
                address: [],
                error: null,
                loading: false,
            };
            break;
        case userConstants.ADD_USER_ORDER_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.ADD_USER_ORDER_SUCCESS:
            state = {
                ...state,
                orders: action.payload.order,
                placedOrderId: action.payload.order._id,
                error: null,
                loading: false,
            };
            break;
        case userConstants.ADD_USER_ORDER_FAILURE:
            state = {
                ...state,
                placedOrderId: null,
                error: action.payload.error,
                loading: false,
            };
            break;

        case userConstants.GET_USER_ORDER_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.GET_USER_ORDER_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders,
                // placedOrderId: action.payload.order._id,
                error: null,
                loading: false,
            };
            break;
        case userConstants.GET_USER_ORDER_FAILURE:
            state = {
                ...state,
                placedOrderId: null,
                error: action.payload.error,
                loading: false,
            };
            break;


        case userConstants.GET_USER_ORDER_DETAILS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.GET_USER_ORDER_DETAILS_SUCCESS:
            state = {
                ...state,
                orderDetails: action.payload.order,
                error: null,
                loading: false,
            };
            break;
        case userConstants.GET_USER_ORDER_DETAILS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
            break;
    }

    return state;
}
