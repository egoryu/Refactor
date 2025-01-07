import { instance } from "./api.config.js";

const ProfileService = {

    getProfileData() {
        return instance.get("/profile/");
    },
    putProfileData(data) {
        return instance.put("/profile/", data);
    },
    getPortfolioData() {
        return instance.get("/profile/portfolio/");
    },
    sendMessage(title, content) {
        return instance.post("/profile/ticket/", {content, title})
    }
}

export default ProfileService;