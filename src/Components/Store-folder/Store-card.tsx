/**
 * StoreCard component
 * 
 * - Displays basic information about a single store: name, tags, and items.
 * - Allows the user to edit or delete the store via action buttons.
 * 
 * Props:
 * @prop {Store} store 
 * @prop {() => void} onEdit 
 * @prop {() => void} onDelete 
 */
import type { Store } from 'Components/Store-folder/Store-type';

interface Props {
  store: Store;
  onEdit: () => void;
  onDelete: () => void;
}

const StoreCard = ({ store, onEdit, onDelete }: Props) => {
  return (
    <div className="store-card">
      {/**/}
      <h2 className="title is-4">{store.name}</h2>
      {/*  */}
      <p><strong>Tags:</strong></p>
      <p>
        {store.tags?.length
          ? store.tags.map((tag, idx) => (
              <span key={tag.id ?? idx} className="tag name" style={{ marginRight: '4px' }}>
          {tag.name}
              </span>
            ))
          : "No tags"}
      </p>
      {/*  */}
      <div>
        <p><strong>Items:</strong></p>
        <p>
          {store.items && store.items.length > 0
            ? store.items.map((item, idx) => (
                <span key={item.id ?? idx} className="tag item is-light" style={{ marginRight: '4px' }}>
                  {item.name ?? JSON.stringify(item)}
                </span>
              ))
            : "Nema artikala"}
        </p>
      </div>
      {/*  */}
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

export default StoreCard;
