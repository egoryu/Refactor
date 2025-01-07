import {useEffect, useState} from "react";
import TradeService from "../../../api/api.trade";

export function Category(props) {
    const [category, setCategory] = useState([]);

    useEffect( () => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await TradeService.getCategory();
            const data = response.data;
            data.unshift({
                id: 0,
                name: 'All',
            });
            setCategory(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={'category'}>
            {category.map(el => (
                <div key={el.id} onClick={() => props.chooseCategory(el.id)}>{el.name}</div>
            ))}
        </div>
    )
}