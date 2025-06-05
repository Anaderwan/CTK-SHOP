import { Store } from './Store-type';

interface Props {
  store: Store;
}

const StoreCard = ({ store }: Props) => {
  return (
    <div className="store-card">
      <h2>{store.name}</h2>
      <div className="tags">
        {store.tags?.length
          ? store.tags.map((tag, idx) => (
              <span key={tag.id ?? idx}>
                {tag.name}
              </span>
            ))
          : "Nema tagova"}
      </div>
      <div className="items">
        {store.items && store.items.length > 0
          ? store.items.map((item, idx) => (
              <span key={item.id ?? idx}>
                {item.name ?? JSON.stringify(item)}
              </span>
            ))
          : "Nema artikala"}
      </div>
    </div>
  );
};

export default StoreCard;