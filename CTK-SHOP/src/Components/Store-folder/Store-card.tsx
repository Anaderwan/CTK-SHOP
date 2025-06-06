import type { Store } from './Store-type';

interface Props {
  store: Store;
  onEdit: () => void;
  onDelete: () => void;
}

const StoreCard = ({ store, onEdit, onDelete }: Props) => {
  return (
    <div className="store-card">
      <h2 className="title is-3">{store.name}</h2>

      <p><strong>Tags:</strong></p>
      <p>
        {store.tags?.length
          ? store.tags.map((tag, idx) => (
              <span key={tag.id ?? idx} className="tag name" style={{ marginRight: '4px' }}>
                {tag.name}
              </span>
            ))
          : "Nema tagova"}
      </p>

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

      <div className="botuni">
        <button className="button is-primary" onClick={onEdit}>Edit</button>
        <button className="button is-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default StoreCard;
