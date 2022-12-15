import { authConstants } from "../actions/constants";

const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    },
    message: '',
    error: '',
    authenticate: false,
    authenticating: false
}

export default function(state = initState,action) {
    console.log(action);
    switch(action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                message: '',
                error: '',
                authenticating: true,
                authenticate: false
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                message: action.payload.message,
                error: '',
                authenticating: false,
                authenticate: true
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                message: '',
                error: action.payload.error,
                authenticating: false,
                authenticate: false
                
            }
            break;

        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...state,
                token: null,
                user: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    picture: ''
                },
                error: '',
                authenticate: false,
                authenticating: false,
                message: '',
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                authenticating: false
            }
            break;

        case authConstants.SIGNUP_REQUEST:
            state = {
                ...state,
            }
            break;
        case authConstants.SIGNUP_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                // user: action.payload.user,
            }
            break;
        case authConstants.SIGNUP_FAILURE:
            state = {
                ...state,
                message: action.payload.message,
                error: action.payload.error,
            }
            break;

    }

   return state;
}