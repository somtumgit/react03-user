import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = function() {
     return async function(dispatch) {
        const token = window.localStorage.getItem('token');
        // console.log(token);
        dispatch({type: categoryConstants.GET_ALL_CATEGORY_REQUEST});
        await axios.get('category/get',{ headers: { Authorization: `Bearer ${token}` }}).then(res => {
            if(res.status === 200) {
                // console.log(res);
                const {categoryList} = res.data;
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                    payload: {
                        categoryList: categoryList
                    }
                });
            }
        }).catch(function (error) {
            // if status = 400
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if(error.response.status === 400) {
                    dispatch({
                        type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                        payload: {
                            error: error.response.data.error
                        }
                    });
                }
                
            }
        });
     }
}

export const addCategory = function(form) {
    return async function(dispatch) {
        dispatch({ type: categoryConstants.ADD_CATEGORY_REQUEST });
        await axios.post('category/create', form).then(function(res) {
            // console.log(res);
            if(res.status === 201) {
                dispatch({
                    type: categoryConstants.ADD_CATEGORY_SUCCESS,
                    payload: {
                        category: res.data.category
                    }
                });
            }
        }).catch(function(error) {
            // if status = 400
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);

                if(error.response.status === 400) {
                    dispatch({
                        type: categoryConstants.ADD_CATEGORY_FAILURE,
                        payload: {
                            error: error.response.data.error
                        }
                    });
                }
                
            }
        });
    }
}