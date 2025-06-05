import type { Item } from "./Items-Type";
interface Props {
    item:Item;
}
const ItemCard = ({item}: Props )=> {
  return (
    <div>
      <strong>{item.name}</strong> – ${item.price.toFixed(2)} <br />
          Store: {item.store.name} <br />
          Tags: {item.tags.map((tag) => tag.name).join(", ")}
    </div>
  )
}



export default ItemCard