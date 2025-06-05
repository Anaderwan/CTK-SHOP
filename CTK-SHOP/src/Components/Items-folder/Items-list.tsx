import ItemCard from './Item-card';
import type { Item } from '../Store-folder/Store-type';

const dummyItem: Item = {
  id: '1',
  name: 'Test artikl',
  price: 10,
  tags: [{ name: 'test' }],
  store: { id: '1', name: 'Plodine' }
};

const ItemsList = () => {
  return (
    <div>
      <h2>Artikli</h2>
      <ItemCard item={dummyItem} />
    </div>
  );
};

export default ItemsList;
