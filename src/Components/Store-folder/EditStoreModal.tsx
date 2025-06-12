/**
 * EditStoreModal component
 * 
 * - Displays a modal form for editing a store.
 * - The user can edit the store's name, location, and manage tags.
 * - Buttons at the bottom allow saving or cancelling changes.
 * 
 * Props:
 * @prop {Store} store 
 * @prop {Tag} [tag] 
 * @prop {(e: React.ChangeEvent<HTMLInputElement>) => void} onInputChange 
 * @prop {() => void} onSave 
 * @prop {() => void} [onAddTag] 
 * @prop {(tagId: number) => void} [onDeleteTag] 
 * @prop {() => void} onClose 
 */
import React from "react";
import type { Store, Tag } from "./Store-type";

interface Props {
  store: Store;
  tag?: Tag;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onAddTag?: () => void;
  onDeleteTag?: (tagId: number) => void;
  onClose: () => void;
  usePostgres?: boolean;
}

const EditStoreModal = ({
  store,
  onSave,
  onInputChange,
  onAddTag,
  onDeleteTag,
  tag,
  onClose,
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
      {/* */}
      <label>Tags</label>
      <div className="tag-list">
        {store.tags?.map((tag) => (
          <div key={tag.id ?? tag.name} className="tag-entry">
            <span>{tag.name}</span>
            <button onClick={() => onDeleteTag?.(tag.id)} style={{ color: "red" }}>
              🗑
            </button>
          </div>
        ))}
      </div>
      {/* */}
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
      {/* */}
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

export default EditStoreModal;