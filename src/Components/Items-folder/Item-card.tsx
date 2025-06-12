/**
 * ItemCard component
 * 
 * - Visually displays a single item (name, price, store, and tags).
 * - Contains edit and delete buttons, which trigger parent callback functions.
 * 
 * Props:
 * @prop {Item} item 
 * @prop {() => void} onEdit 
 * @prop {() => void} onDelete 
 */
import type { Item } from "./ItemsType";

interface Props {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
}

const ItemCard = ({ item, onEdit, onDelete }: Props) => {
  return (
    <div className="item-card">
      {/* Item name */}
      <h2 className="title is-4">{item.name}</h2>
      {/* Price */}
      <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
      {/* Store to which the item belongs */}
      <p><strong>Store:</strong> {item.store.name}</p>
      {/* List of tags or a message if none exist */}
      <p><strong>Tags:</strong></p>
      <p>
        {item.tags.length > 0 ? (
          item.tags.map((tag, idx) => (
            <span key={tag.id ?? idx} className="tag name" style={{ marginRight: '4px' }}>
              {tag.name}
            </span>
          ))
        ) : (
          "No tags"
        )}
      </p>
      {/* Edit and delete button */}
      <div className="botuni">
        <button className="button is-primary" onClick={onEdit}>
          <span>Edit</span>
        </button>
        <button className="button is-danger" onClick={onDelete}>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ItemCard;