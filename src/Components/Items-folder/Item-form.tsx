/**
 * ItemForm component
 * 
 * - Displays a form for editing or adding a new item.
 * - Allows input of name, price, and tags.
 * - Calls functions for saving and managing tags via props.
 * 
 */
import React from "react";
import type { Item, Tag } from "./ItemsType";

interface Props {
  item: Item;
  onSave: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  onAddTag?: () => void;
  tag?: Tag;
  onDeleteTag?: (id: number) => void;
}

const ItemForm = ({
  item,
  onSave,
  onInputChange,
  onAddTag,
  tag,
  onDeleteTag,
}: Props) => {
  return (
    <div>
      {/* Input for item name */}
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={onInputChange}
      />
      {/* Input for item price */}
      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={onInputChange}
      />
      {/* Display store name (for information only, not editable) */}
      <label htmlFor="storeName">Store Name: {item.store.name}</label>
      {/* Input filed for new tag*/}
      <label htmlFor="tag0">Tag</label>
      <input
        type="text"
        name="tag0"
        value={tag?.name || ""}
        onChange={onInputChange}
      />
      {/* List of already added tags with delete option */}
      {item.tags.map((tag) => (
  <div key={tag.id}>
    <span>{tag.name}</span>
    <button type="button" onClick={() => onDeleteTag?.(tag.id)}>Delete</button>
  </div>
))}
      {/*  */}
      <button onClick={onAddTag}>Add tag</button>
      {/*  */}
      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default ItemForm;
