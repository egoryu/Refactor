import {Link} from "react-router-dom";

export function Item(props) {
    return (
        <div className={'item'}>
            <h1>{props.item.Name}</h1>
            <Link to={`/trading/stock/${props.item.Id}`} className={"link"}>
                <img src={'img/money.jpg'} alt={"money"}/>
            </Link>
        </div>
    )
}
