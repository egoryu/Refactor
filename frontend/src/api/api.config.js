import axios from "axios";

export const instance = axios.create({
    baseURL: "https://1783-95-161-221-55.ngrok-free.app/",
    //withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        config.headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json; charset=utf-8",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
        };
        return config;
    }
);

instance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = {...error.config};
        originalRequest._isRetry = true;
        if (
            error.response.status === 401 &&
            error.config && !error.config._isRetry
        ) {
            try {
                const resp = await instance.get("/api/refresh");
                localStorage.setItem("token", resp.data.accessToken);

                return instance.request(originalRequest);
            } catch (error) {
                console.log("AUTH ERROR");
            }
        }

        throw error;
    }
);