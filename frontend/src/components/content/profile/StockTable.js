import {StockItem} from "./StockItem";
import React from "react";
import "../../../style/portfolio.css"

export function StockTable(props) {
    return (
        <table className={"table"}>
            <thead>
            <tr>
                <th>Название</th>
                <th>Количество</th>
                <th>Цена</th>
                <th>Сумма</th>
            </tr>
            </thead>
            <tbody>
            {props.items.map(el => (
                    <StockItem key={el.id} item={el}/>
                )
            )}
            </tbody>
        </table>
    )
}