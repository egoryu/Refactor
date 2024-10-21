import {Item} from "./Item";

export function List(props) {
    return (
        <main>
            {props.items.map(el => (
                <Item key={el.id} item={el}/>
            ))}
        </main>
    )
}