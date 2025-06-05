import React from "react";
import type { Item, Tag } from "./Items-Type";

interface Props {
  item: Item;
  onSave: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; //ovo tu React.ChangeEvent<HTMLInputElement> je neka typescript shema to neznam objasniti
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
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={onInputChange}
      />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={onInputChange}
      />

      <label htmlFor="storeName">Store Name: {item.store.name}</label>

      <label htmlFor="tag0">Tag</label>
      <input
        type="text"
        name="tag0"
        value={tag?.name || ""}
        onChange={onInputChange}
      />
     {item.tags.map((tag) => (
  <div key={tag.id}>
    <span>{tag.name}</span>
    <button type="button" onClick={() => onDeleteTag?.(tag.id)}>Delete</button>
  </div>
))}
      <button onClick={onAddTag}>Add tag</button>

      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default ItemForm;