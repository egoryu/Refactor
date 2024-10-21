import { instance } from "./api.config.js";

const ProfileService = {

    getProfileData() {
        return instance.get("/api/profile/");
    },
    putProfileData(data) {
        return instance.put("/api/profile/", data);
    },
    getPortfolioData() {
        return instance.get("/api/portfolio/");
    },
    sendMessage(title, content) {
        return instance.post("/api/ticket/", {content, title})
    }
}

export default ProfileService;