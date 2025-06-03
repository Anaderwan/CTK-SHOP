import { Store } from './Store-type';

interface Props {
  store: Store;
}

const StoreCard = ({ store }: Props) => {
  return (
    <div className="store-card">
      <h2 className="title is-4">{store.name}</h2>
      <p>
        {store.tags?.length
          ? store.tags.map((tag, idx) => (
              <span key={tag.id ?? idx} className="tag is-info" style={{ marginRight: '4px' }}>
                {tag.name}
              </span>
            ))
          : "Nema tagova"}
      </p>
      <p>
        {store.items && store.items.length > 0
          ? store.items.map((item, idx) => (
              <span key={item.id ?? idx} className="tag is-light" style={{ marginRight: '4px' }}>
                {item.name ?? JSON.stringify(item)}
              </span>
            ))
          : "Nema artikala"}
      </p>
    </div>
  );
};

export default StoreCard;