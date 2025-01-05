import AuthService from "../api/api.auth";

export const loginRequest = () => ({ type: "LOGIN_REQUEST" });
export const loginSuccess = (token) => ({ type: "LOGIN_SUCCESS", token });
export const loginFailure = () => ({ type: "LOGIN_FAILURE" });

export const registerRequest = () => ({ type: "REGISTER_REQUEST" });
export const registerSuccess = (token) => ({ type: "REGISTER_SUCCESS", token });
export const registerFailure = () => ({ type: "REGISTER_FAILURE" });

export const logout = () => ({ type: "LOGOUT" });

// Async login action
export const login = (email, password) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const resp = await AuthService.login(email, password);
        localStorage.setItem("token", resp.data.token);
        dispatch(loginSuccess(resp.data.token));
    } catch (err) {
        console.log("Login error");
        dispatch(loginFailure());
    }
};

// Async register action
export const register = (email, password) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const resp = await AuthService.registration(email, password);
        dispatch(registerSuccess(resp.data.token));
    } catch (err) {
        console.log("Register error");
        dispatch(registerFailure());
    }
};

// Async check authentication
export const checkAuth = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const resp = await AuthService.refreshToken();
        localStorage.setItem("token", resp.data.token);
        dispatch(loginSuccess(resp.data.token));
    } catch (err) {
        console.log("Check auth error");
    }
};

// Async logout action
export const logoutUser = () => async (dispatch) => {
    try {
        await AuthService.logout();
        localStorage.removeItem("token");
        dispatch(logout());
    } catch (err) {
        console.log("Logout error");
    }
};
