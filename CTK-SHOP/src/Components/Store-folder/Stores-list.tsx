import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import StoreCard from './Store-card';
import { Store, Item } from './Store-type';

const StoreList = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesRes = await axiosClient.get<Store[]>('/stores');
        const itemsRes = await axiosClient.get<Item[]>('/items');
        setStores(storesRes.data);
        setItems(itemsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {stores.map(store => {
        // Filtriraj artikle koji pripadaju ovom store-u
        const storeItems = items.filter(
          item => item.store && item.store.id == store.id
        );
        return (
          <StoreCard key={store.id} store={{ ...store, items: storeItems }} />
        );
      })}
    </div>
  );
};

export default StoreList;