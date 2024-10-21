import React from "react";
import {StockTable} from "./StockTable";

export function StockList(props) {
    let category = props.items?.reduce((acc, val) => {
        if (!acc.includes(val.category_id)) {
            acc.push(val.category_id);
        }
        return acc;
    }, []);

    return (
        <div>
            {category?.map(el => (
                <div className={"stockList"}>
                    <h2>{props.items?.find(it => it.category_id === el)?.category}</h2>
                    <StockTable items={props.items?.filter(it => it.category_id === el)}/>
                </div>
                ))
            }
        </div>
    )
}