
export function StockItem(props) {
    return (
        <tr key={props.item.id}>
            <td>{props.item.name}</td>
            <td>{props.item.amount}</td>
            <td>{props.item.price}</td>
            <td>{props.item.price * props.item.amount}</td>
        </tr>
    )
}