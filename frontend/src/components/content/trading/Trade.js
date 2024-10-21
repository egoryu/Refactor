import {List} from "./List";
import "../../../style/trade.css"
import React, {useEffect, useState} from "react";
import {Category} from "./Category";
import TradeService from "../../../api/api.trade";

export function Trade() {
    const [items, setItems] = useState([]);
    let [curItems, setCurItems] = useState(items);

    useEffect( () => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await TradeService.getAllStock();
            const data = response.data.stocks;
            setItems(data);
            setCurItems(data)
        } catch (error) {
            console.error(error);
        }
    };
    function chooseCategory(category) {
        if (category === 0) {
            setCurItems(items);
            return;
        }
        setCurItems(items.filter(el => el.category_id === category));
    }

    return (
        <div>
            <Category chooseCategory={chooseCategory}/>
            <List items={curItems} />
        </div>
    )
}