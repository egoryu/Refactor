import { instance } from "./api.config.js";

const TradeService = {

    getStockPrice(id) {
        return instance.get(`/api/stocks/${id}/price`);
    },
    getStockData(id) {
        return instance.get(`/api/stocks/${id}`);
    },
    stockBuy(stock_id, amount) {
        return instance.post("api/buy", {amount, stock_id});
    },
    stockSell(stock_id, amount) {
        return instance.post("api/sell", {amount, stock_id});
    },
    getCategory() {
        return instance.get("/api/categories");
    },
    getAllStock() {
        return instance.get("/api/stocks");
    },
}

export default TradeService;