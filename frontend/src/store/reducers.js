const initialState = {
    isAuth: false,
    isAuthInProgress: false,
    token: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
        case "REGISTER_REQUEST":
            return { ...state, isAuthInProgress: true };
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            return { ...state, isAuthInProgress: false, isAuth: true, token: action.token };
        case "LOGIN_FAILURE":
        case "REGISTER_FAILURE":
            return { ...state, isAuthInProgress: false };
        case "LOGOUT":
            return { ...state, isAuth: false, token: null };
        default:
            return state;
    }
};
