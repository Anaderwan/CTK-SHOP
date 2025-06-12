/**
 * StoreList component
 * 
 * - Main component for displaying and managing the list of stores.
 * - Enables CRUD operations: fetching, adding, editing, and deleting stores.
 * - Supports displaying items within each store, as well as adding/removing tags.
 * - Uses modals for creating and editing without redirecting.
 */
import React, { useState, useEffect } from "react";
import axiosClient from "api/axiosClient";
import axiosClientPg from "api/axiosClientPg";
import StoreCard from "./Store-card";
import Modal from "../UI/Modal";
import EditStoreModal from "./EditStoreModal";
import StoreForCreate from "./StoreForCreate";
import type { Store, Item, Tag } from 'Components/Store-folder/Store-type';
import { useLocation, useNavigate } from "react-router-dom";

const StoreList = () => {
  const usePostgres = false;
  const client = usePostgres ? axiosClientPg : axiosClient;
  
  // ========== STATE ========== //
  const [stores, setStores] = useState<Store[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState<Tag>();

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const isCreating = searchParams.get("create") === "true";

  const [newStore, setNewStore] = useState<Store>({
    id: 0,
    name: "",
    location: "",
    tags: [],
  });

  // ========== FETCH ========== //
  useEffect(() => {
    fetchData();
  }, []);

  /** Fetches stores and items from the API */
  const fetchData = async () => {
    try {
      const storesRes = await client.get<Store[]>("/stores");
      const itemsRes = await client.get<Item[]>("/items");
      setStores(storesRes.data);
      setItems(itemsRes.data);

      const allTags: Tag[] = storesRes.data.flatMap((store) => store.tags || []);
      setTags(allTags);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // ========== DELETE ========== //
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this store?")) return;
    try {
      await client.delete(`/stores/${id}`);
      setStores((prev) => prev.filter((store) => store.id !== id));
    } catch (err) {
      console.error("Error deleting store:", err);
    }
  };

  // ========== EDIT ========== //
  const startEdit = (store: Store) => {
    setEditingStore({ ...store });
    setTag(undefined);
  };
  const cancelEdit = () => {
    setEditingStore(null);
    setTag(undefined);
  };
  const onEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!editingStore) return;

    if (name === "tag0") {
      const allIds = tags.map((t) => t.id || 0);
      const maxId = allIds.length > 0 ? Math.max(...allIds) : 0;
      setTag({ id: maxId + 1, name: value });
      return;
    }

    setEditingStore((prev) => prev ? { ...prev, [name]: value } : null);
  };
  const onAddEditTag = () => {
    if (!editingStore || !tag) return;
    const updatedTags = [...(editingStore.tags || []), tag];
    setEditingStore({ ...editingStore, tags: updatedTags });
    setTag(undefined);
  };
  const onDeleteEditTag = (tagId: number) => {
    if (!editingStore) return;
    const updatedTags = (editingStore.tags || []).filter((t) => t.id !== tagId);
    setEditingStore({ ...editingStore, tags: updatedTags });
  };

  const onSave = async () => {
    if (!editingStore) return;
    try {
      await client.put(`/stores/${editingStore.id}`, editingStore);
      const updated = stores.map((s) =>
        s.id === editingStore.id ? editingStore : s
      );
      setStores(updated);
      cancelEdit();
    } catch (err) {
      console.error("Error saving store:", err);
    }
  };

  // ========== CREATE ========== //
  
  const cancelCreate = () => {
    navigate("/app/stores");
    setNewStore({ id: 0, name: "", location: "", tags: [] });
    setTag(undefined);
  };
  
  const onCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "tag0") {
      const allIds = (newStore.tags ?? []).map((t) => t.id || 0);
      const maxId = allIds.length > 0 ? Math.max(...allIds) : 0;
      setTag({ id: maxId + 1, name: value });
      return;
    }

    setNewStore((prev) => ({ ...prev, [name]: value }));
  };
 
  const onAddCreateTag = () => {
    if (!tag) return;
    setNewStore((prev) => ({ ...prev, tags: [...(prev.tags ?? []), tag] }));
    setTag(undefined);
  };
  
  const onDeleteCreateTag = (tagId: number) => {
    setNewStore((prev) => ({
      ...prev,
      tags: (prev.tags ?? []).filter((t) => t.id !== tagId),
    }));
  };
  
  const saveNewStore = async () => {
    try {
      await client.post('/stores', newStore);
      cancelCreate();
      fetchData();
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  // ========== RENDER ========== //
  return (
    <>
      {/*  */}
      {stores.map((store) => {
        const storeItems = items.filter(
          (item) => item.store && item.store.id === store.id
        );
        return (
          <div key={store.id} className="store-wrapper">
            <StoreCard
              store={{ ...store, items: storeItems }}
              onEdit={() => startEdit(store)}
              onDelete={() => handleDelete(store.id)}
            />
          </div>
        );
      })}
      {/* */}
      {editingStore && (
        <Modal onClose={cancelEdit}>
          <EditStoreModal
            store={editingStore}
            tag={tag}
            onInputChange={onEditInputChange}
            onSave={onSave}
            onAddTag={onAddEditTag}
            onDeleteTag={onDeleteEditTag}
            onClose={cancelEdit}
            usePostgres={true}
          />
        </Modal>
      )}
      {/*  */}
      {isCreating && (
        <Modal onClose={cancelCreate}>
          <StoreForCreate
            store={newStore}
            tag={tag}
            onSave={saveNewStore}
            onCancel={cancelCreate}
            onInputChange={onCreateInputChange}
            onAddTag={onAddCreateTag}
            onDeleteTag={onDeleteCreateTag}
            usePostgres={true}
          />
        </Modal>
      )}
    </>
  );
};

export default StoreList;