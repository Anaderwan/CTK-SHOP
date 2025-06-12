/**
 * StoreForCreate component
 * 
 * - Displays a form for entering a new store (inside a modal).
 * - The user enters the name, location, and adds tags.
 * - No ID field because the ID is assigned automatically on the backend.
 * 
 * Props:
 * @prop {Store} store 
 * @prop {Tag} [tag] 
 * @prop {() => void} onSave 
 * @prop {() => void} onCancel 
 * @prop {(e: React.ChangeEvent<HTMLInputElement>) => void} onInputChange 
 * @prop {() => void} onAddTag 
 * @prop {(tagId: number) => void} onDeleteTag 
 */
import React from "react";
import type { Store, Tag } from "./Store-type";

interface Props {
  store: Store;
  tag?: Tag;
  onSave: () => void;
  onCancel: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTag: () => void;
  onDeleteTag: (tagId: number) => void;
  usePostgres?: boolean;
}

const StoreForCreate = ({
  store,
  tag,
  onSave,
  onCancel,
  onInputChange,
  onAddTag,
  onDeleteTag,
}: Props) => {
  return (
    <div className="edit-item-modal">
      {/*  */}
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={store.name}
        onChange={onInputChange}
      />
      {/*  */}
      <label>Location</label>
      <input
        type="text"
        name="location"
        value={store.location || ""}
        onChange={onInputChange}
      />
      {/*  */}
      <label>Tags</label>
      <div className="tag-list">
        {store.tags?.map((tag) => (
          <div key={tag.id} className="tag-entry">
            <span>{tag.name}</span>
            <button onClick={() => onDeleteTag(tag.id)} style={{ color: "red" }}>
              🗑
            </button>
          </div>
        ))}
      </div>
      {/*  */} 
      <div className="new-tag-input">
        <input
          type="text"
          name="tag0"
          value={tag?.name || ""}
          onChange={onInputChange}
          placeholder="New tag"
        />
        <button className="button is-secondary" onClick={onAddTag}>
          ➕ Add
        </button>
      </div>
      {/*  */}
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

export default StoreForCreate;