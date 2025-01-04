import { instance } from "./api.config.js";

const AuthService = {

    login (email, password) {
        return instance.post("/auth/login", {email, password})
    },

    registration(email, password) {
        return instance.post("/auth/register", {email, password});
    },

    refreshToken() {
        return instance.get("/auth/refresh");
    },

    logout() {
        return instance.post("/auth/logout");
    },
}

export default AuthService;