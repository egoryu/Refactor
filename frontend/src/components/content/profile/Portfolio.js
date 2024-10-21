import {Category} from "../trading/Category";
import React, {useEffect, useState} from "react";
import {StockList} from "./StockList";
import ProfileService from "../../../api/api.profile";

export function Portfolio() {
    const [items, setItems] = useState([{}]);

    let [curItems, setCurItems] = useState(items);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await ProfileService.getPortfolioData();
            setItems(response.data);
            setCurItems(response.data);
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
        }
    };
    function chooseCategory(category_id) {
        if (category_id === 0) {
            setCurItems(items);
            return;
        }
        setCurItems(items?.filter(el => el.category_id === category_id));
    }

    return (
        <div>
            <Category className={'category'} chooseCategory={chooseCategory}/>
            <StockList items={curItems}/>
        </div>
    )
}

//INSERT INTO stock_price (stock_id, date, price) VALUES ()