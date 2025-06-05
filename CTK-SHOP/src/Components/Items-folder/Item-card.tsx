import type { Item } from '../Store-folder/Store-type';

type Props = {
  item: Item;
};

const ItemCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <p>Cijena: {item.price ?? 'N/A'} €</p>
      {item.tags?.length ? (
        <div className="tags">
          {item.tags.map((tag, idx) => (
            <span key={tag.id ?? idx}>{tag.name}</span>
          ))}
        </div>
      ) : (
        <p>Nema tagova</p>
      )}
      {item.store ? (
        <p>Trgovina: {item.store.name}</p>
      ) : (
        <p>Bez povezane trgovine</p>
      )}
    </div>
  );
};

export default ItemCard;
