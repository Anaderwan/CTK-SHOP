/**
 * ItemForCreate component
 * 
 * - Displays a modal form for entering a new item.
 * - Allows input of all basic data: name, price, store (ID and name), tags.
 * - Includes input for a new tag and the ability to delete existing tags
 * 
 * Props:
 * @prop {Item} item 
 * @prop {Tag} [tag] 
 * @prop {() => void} onSave 
 * @prop {() => void} onCancel 
 * @prop {(event: React.ChangeEvent<HTMLInputElement>) => void} onInputChange 
 * @prop {() => void} onAddTag 
 * @prop {(id: number) => void} onDeleteTag 
 */
import React from "react";
import type { Item, Tag } from "./ItemsType";

interface Props {
  item: Item;
  tag?: Tag;
  onSave: () => void;
  onCancel: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTag: () => void;
  onDeleteTag: (id: number)  => void;
}

const ItemForCreate = ({
  item,
  tag,
  onSave,
  onCancel,
  onInputChange,
  onAddTag,
  onDeleteTag,
}: Props) => {
  return (
    <div className="edit-item-modal">
      {/* Item name */}
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={onInputChange}
      />
      {/* Price */}
      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={onInputChange}
      />
      {/* Store ID */}
      <label htmlFor="storeId">Store ID</label>
      <input
        type="number"
        name="storeId"
        value={item.store.id}
        onChange={onInputChange}
      />
      {/* Store name */}
      <label htmlFor="storeName">Store Name</label>
      <input
        type="text"
        name="storeName"
        value={item.store.name}
        onChange={onInputChange}
      />
      {/* Tags list */}
      <label>Tags</label>
      <div className="tag-list">
        {item.tags.map((tag) => (
          <div key={tag.id} className="tag-entry">
            <span>{tag.name}</span>
            <button onClick={() => onDeleteTag(tag.id)} style={{ color: 'red' }}>🗑</button>
          </div>
        ))}
      </div>
      {/* Enter new tag */}
      <div className="new-tag-input">
        <input
          type="text"
          name="tag0"
          value={tag?.name || ""}
          onChange={onInputChange}
          placeholder="New tag"
        />
        <button className="button is-secondary" onClick={onAddTag}>➕ Add</button>
      </div>
      {/* Button */}
      <div className="form-buttons">
        <button className="button is-primary" onClick={onSave}>
          <span>Save</span>
        </button>
        <button className="button is-secondary" onClick={onCancel}>
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default ItemForCreate;