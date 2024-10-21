import { makeAutoObservable } from "mobx";
import AuthService from "../api/api.auth.js";

class AuthStore {
    isAuth = false;
    isAuthInProgress = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async login(email, password) {
        this.isAuthInProgress = true;
        try {
            const resp = await AuthService.login(email, password);
            localStorage.setItem("token", resp.data.token);
            this.isAuth = true;

        } catch (err) {
            console.log("login error");
        } finally {
            this.isAuthInProgress = false;
        }
    }

    async register(email, password) {
        this.isAuthInProgress = true;
        try {
            const resp = await AuthService.registration(email, password);
            this.isAuth = true;

        } catch (err) {
            console.log("register error");
        } finally {
            this.isAuthInProgress = false;
        }
    }
    async checkAuth() {
        this.isAuthInProgress = true;
        try {
            if (!this.isAuth && !!localStorage.getItem("token")) {
                const resp = await AuthService.refreshToken();
                localStorage.setItem("token", resp.data.token);
                this.isAuth = true;
            }

        } catch (err) {
            console.log("login error");
        } finally {
            this.isAuthInProgress = false;
        }
    }

    async logout() {
        this.isAuthInProgress = true;
        try {
            await AuthService.logout();
            this.isAuth = false;
            localStorage.removeItem("token");
        } catch (err) {
            console.log("logout error");
        } finally {
            this.isAuthInProgress = false;
        }
    }

}

const authStore = new AuthStore();
export default authStore;