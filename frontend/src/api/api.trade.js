import { instance } from "./api.config.js";

const TradeService = {

    getStockPrice(id) {
        return instance.get(`/stocks/${id}/price`);
    },
    getStockData(id) {
        return instance.get(`/stocks/${id}`);
    },
    stockBuy(stock_id, amount) {
        return instance.post("stocks/buy", {amount, stock_id});
    },
    stockSell(stock_id, amount) {
        return instance.post("stocks/sell", {amount, stock_id});
    },
    getCategory() {
        return instance.get("/stocks/categories");
    },
    getAllStock() {
        return instance.get("/stocks/");
    },
}

export default TradeService;