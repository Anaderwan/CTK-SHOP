import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import StoreCard from './Store-card';
import type { Store, Item } from './Store-type';
import { useNavigate } from 'react-router-dom';

const StoreList = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storesRes = await axiosClient.get<Store[]>('/stores');
      const itemsRes = await axiosClient.get<Item[]>('/items');
      setStores(storesRes.data);
      setItems(itemsRes.data);
    } catch (err) {
      console.error('Greška pri dohvaćanju podataka:', err);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Jesi li siguran da želiš obrisati ovu trgovinu?')) return;
    try {
      await axiosClient.delete(`/stores/${String(id)}`); // ✅ osiguraj da je string
      // osvježi listu
      setStores(prev => prev.filter(store => String(store.id) !== String(id)));
    } catch (err) {
      console.error('Greška pri brisanju:', err);
    }
  };

  const handleEdit = (store: Store) => {
    navigate(`/app/edit-store/${String(store.id)}`, { state: { store } }); // ✅ osiguraj da je string
  };

  return (
    <div>
      {stores.map(store => {
        const storeItems = items.filter(
          item => item.store && String(item.store.id) === String(store.id) // ✅ usporedi kao stringove
        );
        return (
          <StoreCard
            key={String(store.id)} // ✅ key treba biti string
            store={{ ...store, items: storeItems }}
            onEdit={() => handleEdit(store)}
            onDelete={() => handleDelete(store.id)}
          />
        );
      })}
    </div>
  );
};

export default StoreList;
