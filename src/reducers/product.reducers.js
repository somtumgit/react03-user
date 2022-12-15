import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    productsByPrice: [],
    page: {},
    productDetail: [],
    message: '',
    error: null,
    loading: false
}

export default function(state = initState,action) {
    // console.log(action);
    switch(action.type) {
        case productConstants.GET_PRODUCT_BY_SLUG_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_PRODUCT_BY_SLUG_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: action.payload.productsByPrice,
                error: null,
                loading: false
            }
            break;
        case productConstants.GET_PRODUCT_BY_SLUG_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;

        case productConstants.GET_PRODUCT_BY_PAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_PRODUCT_BY_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                error: null,
                loading: false
            }
            break;
        case productConstants.GET_PRODUCT_BY_PAGE_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;


        case productConstants.GET_PRODUCT_DETAIL_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_PRODUCT_DETAIL_BY_ID_SUCCESS:
            state = {
                ...state,
                productDetail: action.payload.productDetail,
                error: null,
                loading: false
            }
            break;
        case productConstants.GET_PRODUCT_DETAIL_BY_ID_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }

   return state;
}