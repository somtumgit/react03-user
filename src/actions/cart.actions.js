import axios from "../helpers/axios";
import { cartConstants } from "./constants";
import store from "../store";

export const addToCart = function(product, newQty = 1) {
    return async function(dispatch) {
        const token = window.localStorage.getItem('token');
        const {cart: { cartItems },auth } = store.getState();

        const qty = cartItems[product._id] ? 
                    parseInt(cartItems[product._id].qty + newQty) : 
                    1;
        cartItems[product._id] = {
            ...product,
            qty,
        };

        // console.log('product',product);
        // console.log('addtocart',cartItems);
        // console.log('addtocart',auth);
        // return;

        if (auth.authenticate) {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            // console.log('addtocart1',window.store.getState());
            const payload = {
                // cartItems: Object.keys(cartItems).map((key, index) => {
                //     return {
                //         quantity: cartItems[key].qty,
                //         product: cartItems[key]._id
                //     }
                // })
                cartItems: [
                    {
                        productId: product._id,
                        quantity: qty,
                        price: product.price
                    },
                ],
            };
            // console.log('payload',payload);
            await axios.post(`/user/cart/addItemToCart`, payload, { headers: { Authorization: `Bearer ${token}` }}).then(res => {
              if(res.status === 201) {
                  // console.log('addItemToCart',res);
                  const {cart} = res.data;
                  dispatch({
                      type: cartConstants.ADD_TO_CART_SUCCESS,
                      payload: {
                        cart: cart
                      }
                  });
                  // console.log('addtocart2',window.store.getState());
                  
                  dispatch(getCartItems());
                  // console.log('addtocart3',window.store.getState());
                  
              }
            }).catch(function (error) {
              // if status = 400
              if (error.response) {
                  // console.log(error.response.data);
                  // console.log(error.response.status);
                  // console.log(error.response.headers);
                  if(error.response.status === 400) {
                      dispatch({
                          type: cartConstants.ADD_TO_CART_FAILURE,
                          payload: {
                              error: error.response.data.error
                          }
                      });
                  }
                  
              }
            });
 
            
        } else {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
        
        // console.log("addToCart::", cartItems);
        
        dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cart: cartItems },
        });


        // console.log('addtocart',store.getState());
        
    }
}

export const getCartItems = function() {
    return async (dispatch) => {
        try {
          const token = window.localStorage.getItem('token');
          dispatch({ type: cartConstants.GET_ALL_CART_REQUEST });
          await axios.get(`/user/cart/getItemCart`,{ headers: { Authorization: `Bearer ${token}` }}).then(res => {
            if(res.status === 200) {
                // console.log(res);
                const { carts, cartItems } = res.data;
                // console.log({ getCartItems: cartItems });
                if (cartItems) {
                  dispatch({
                    type: cartConstants.GET_ALL_CART_SUCCESS,
                    payload: {
                      carts: carts,
                      cartItems: cartItems
                    }
                  });
                }
                
            }
          }).catch(function (error) {
            // if status = 400
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if(error.response.status === 400) {
                    dispatch({
                        type: cartConstants.GET_ALL_CART_FAILURE,
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
}

export const removeCartItem = function(payload) {
    return async (dispatch) => {
        const {cart: { cartItems },auth } = store.getState();
        if (auth.authenticate) {
          try {
            const token = window.localStorage.getItem('token');
            dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
            await axios.post(`/user/cart/removeItem`, { payload }, { headers: { Authorization: `Bearer ${token}` }}).then(res => {
              if(res.status === 202) {
                  // console.log(res);
                  dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
                  dispatch(getCartItems());
              }
            }).catch(function (error) {
              // if status = 400
              if (error.response) {
                  // console.log(error.response.data);
                  // console.log(error.response.status);
                  // console.log(error.response.headers);
                  if(error.response.status === 400) {
                      dispatch({
                          type: cartConstants.REMOVE_CART_ITEM_FAILURE,
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
        } else {
          const {productId} = payload;
          let cart = JSON.parse(localStorage.getItem("cart"));
          // console.log(productId);
          // console.log(cart);
          Object.keys(cart).forEach(function(key) {
            if(key == productId) {
              // console.log(key);
              // console.log(cart[key]);
              delete cart[key]; 
            }
            
          })
          // console.log(cart);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
        
    };
}

export const updateCart = function() {
    return async (dispatch) => {
        const { auth } = store.getState();
        let cartItems = localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : null;
    
        console.log("upppppppppp");
        console.log(auth);
    
        if (auth.authenticate) {
          localStorage.removeItem("cart");
          //dispatch(getCartItems());
          if (cartItems) {
            const payload = {
              cartItems: Object.keys(cartItems).map((key, index) => {
                return {
                  quantity: cartItems[key].qty,
                  productId: cartItems[key]._id,
                  price: cartItems[key].price,
                };
              }),
            };
            if (Object.keys(cartItems).length > 0) {
              const token = window.localStorage.getItem('token');
              dispatch({type: cartConstants.UPDATE_CART_REQUEST});
              await axios.post(`/user/cart/addItemToCart`, payload, { headers: { Authorization: `Bearer ${token}` }}).then(res => {
                if(res.status === 201) {
                    // console.log('addItemToCart',res);
                    const {cart} = res.data;
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: {
                          cart: cart
                        }
                    });
                    // console.log('addtocart2',window.store.getState());
                    
                    dispatch(getCartItems());
                    // console.log('addtocart3',window.store.getState());
                    dispatch({
                      type: cartConstants.UPDATE_CART_SUCCESS,
                      payload: {
                        message: 'Update cart successfull!'
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
                            type: cartConstants.ADD_TO_CART_FAILURE,
                            payload: {
                                error: error.response.data.error
                            }
                        });
                    }
                    
                }
              });
            }
          } else {
            dispatch({type: cartConstants.UPDATE_CART_REQUEST});
            dispatch(getCartItems());
            dispatch({
              type: cartConstants.UPDATE_CART_SUCCESS,
              payload: {
                message: 'Update cart successfull!'
              }
            });
          }
        } else {
          if (cartItems) {
            dispatch({type: cartConstants.UPDATE_CART_REQUEST});
            dispatch({
              type: cartConstants.GET_ALL_CART_SUCCESS,
              payload: { cartItems },
            });
            dispatch({
              type: cartConstants.UPDATE_CART_SUCCESS,
              payload: {
                message: 'Update cart successfull!'
              }
            });
          }
        }
    };
} 

