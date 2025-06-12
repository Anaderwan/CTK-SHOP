/**
 * EditItemModal component
 * 
 * - Displays a modal window for editing an item.
 * - Allows editing of the item's name, price, and tags.
 * - Uses an input field to add a new tag.
 * - Displays existing tags with a delete option.
 * 
 * Props:
 * @prop {Item} item 
 * @prop {() => void} onSave 
 * @prop {(event: React.ChangeEvent<HTMLInputElement>) => void} onInputChange 
 * @prop {() => void} [onAddTag] 
 * @prop {Tag} [tag] 
 * @prop {(id: number) => void} [onDeleteTag] 
 * @prop {() => void} onClose 
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
  onClose: () => void;
}

const EditItemModal = ({
  item,
  onInputChange,
  onSave,
  onAddTag,
  onDeleteTag,
  tag,
  onClose,
}: Props) => {
    console.log("Rendering EditItemModal for:", item.name);
  return (
    <div className="edit-item-modal">
      {/* Item name */}
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={onInputChange}
      />
      {/* Item price */}
      <label>Price</label>
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={onInputChange}
      />
      {/* Store display (not editable) */}
      <label>Store</label>
      <input
        type="text"
        value={item.store.name}
        disabled
      />
      {/* Display list of tags with delete option */}
      <label>Tags</label>
      <div className="tag-list">
        {item.tags.map((tag) => (
          <div key={tag.id} className="tag-entry">
            <span>{tag.name}</span>
            <button onClick={() => onDeleteTag?.(tag.id)} style={{ color: 'red' }}>🗑</button>
          </div>
        ))}
      </div>
      {/* // Input for adding a new tag */}
      <div className="new-tag-input">
        <input
          type="text"
          name="tag0"
          value={tag?.name || ""}
          onChange={onInputChange}
          placeholder="New tag"
        />
        {/* Buttons for saving and cancelling editing */}
        <button className="button is-secondary" onClick={onAddTag}>➕ Add</button>
      </div>
      <div className="form-buttons">
        <button className="button is-primary" onClick={onSave}>
          <span>Save</span>
        </button>
        <button className="button is-secondary" onClick={onClose}>
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default EditItemModal;