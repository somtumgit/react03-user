import { cartConstants, userConstants } from "./constants";
import axios from "../helpers/axios";

export const getAddress = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
      await axios.post(`/user/getaddress`, { headers: { Authorization: `Bearer ${token}` }}).then(res => {
        if(res.status === 200) {
          // console.log(res);
          const { userAddress: { address } } = res.data;
          dispatch({
            type: userConstants.GET_USER_ADDRESS_SUCCESS,
            payload: { address },
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
                    type: userConstants.GET_USER_ADDRESS_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                });
            }
            
        }
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (payload) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
      await axios.post(`/user/address/create`, { payload }, { headers: { Authorization: `Bearer ${token}` }}).then(res => {
        if(res.status === 201) {
          // console.log(res);
          console.log(res);
          const {address: { address }} = res.data;
          dispatch({
            type: userConstants.ADD_USER_ADDRESS_SUCCESS,
            payload: { address },
          });
          dispatch(getAddress());
        }
      }).catch(function (error) {
        // if status = 400
        if (error.response) {
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            if(error.response.status === 400) {
                dispatch({
                    type: userConstants.ADD_USER_ADDRESS_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                });
            }
            
        }
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
      await axios.post(`/addOrder`, payload, { headers: { Authorization: `Bearer ${token}` }} ).then(res => {
        if(res.status === 201) {
          console.log(res);
          const { order } = res.data;
          dispatch({
            type: cartConstants.RESET_CART,
          });
          dispatch({
            type: userConstants.ADD_USER_ORDER_SUCCESS,
            payload: { order },
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
                    type: userConstants.ADD_USER_ORDER_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                });
            }
            
        }
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
      await axios.get(`/getOrders`,{ headers: { Authorization: `Bearer ${token}` }}).then(res => {
        if(res.status === 200) {
          console.log(res);
          const { orders } = res.data;
          dispatch({
            type: userConstants.GET_USER_ORDER_SUCCESS,
            payload: { orders },
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
                    type: userConstants.GET_USER_ORDER_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                });
            }
            
        }
      });

    } catch (error) {
      console.log(error);
    }
  };
};

// single order with complete info and delivery location
export const getOrder = (payload) => {
  return async (dispatch) => {
    try {
      console.log('getOrder');
      const token = window.localStorage.getItem('token');
      dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
      await axios.post(`/getOrder`, payload,{ headers: { Authorization: `Bearer ${token}` }}).then(res => {
        if(res.status === 200) {
          console.log(res);
          const { order } = res.data;
          dispatch({
            type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
            payload: { order },
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
                    type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                });
            }
            
        }
      });
      
    } catch (error) {
      console.log(error);
    }
  };
};