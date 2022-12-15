import axios from '../helpers/axios';
import { productConstants } from "./constants";

export const getProductBySlug = function(slug) {
    return async function(dispatch) {
        // console.log(slug);
        dispatch({type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST});
        await axios.get(`/product/${slug}`).then(function(res) {
            console.log(res);
            if(res.status === 200) {
                // console.log(res);
                const {products, productsByPrice} = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
                    payload: {
                        products: products,
                        productsByPrice: productsByPrice
                    }
                });
            }
        }).catch(function(error) {
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if(error.response.status === 400) {
                    dispatch({
                        type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
                        payload: {
                            error: error.response.data.error
                        }
                    });
                }
                
            }
        });
    }
}

export const getProductByPage = function(payload) {
    return async function(dispatch) {
        // console.log('getProductByPage',payload);
        const {cid, type} = payload.params;
        // console.log('getProductByPage',cid);
        // console.log('getProductByPage',type);
        dispatch({type: productConstants.GET_PRODUCT_BY_PAGE_REQUEST})
        await axios.get(`/page/${cid}/${type}`).then(function(res) {
            // console.log(res);
            if(res.status === 200) {
                console.log(res);
                const {page} = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_BY_PAGE_SUCCESS,
                    payload: {
                        page: page
                    }
                });
            }
        }).catch(function(error) {
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if(error.response.status === 400) {
                    dispatch({
                        type: productConstants.GET_PRODUCT_BY_PAGE_FAILURE,
                        payload: {
                            error: error.response.data.error
                        }
                    });
                }
                
            }
        });
    }
}

export const getProductById = function(payload) {
    // console.log('productaction',payload);
    return async function(dispatch) {
        dispatch({type: productConstants.GET_PRODUCT_DETAIL_BY_ID_REQUEST});
        const {productId} = payload.params;
        await axios.get(`/product-detail/${productId}`).then(function(res) {
            // console.log(res);
            if(res.status === 200) {
                // console.log(res);
                const {product} = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_DETAIL_BY_ID_SUCCESS,
                    payload: {
                        productDetail: product
                    }
                });
            }
        }).catch(function(error) {
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if(error.response.status === 400) {
                    dispatch({
                        type: productConstants.GET_PRODUCT_DETAIL_BY_ID_FAILURE,
                        payload: {
                            error: error.response.data.error
                        }
                    });
                }
                
            }
        });
    }
}



