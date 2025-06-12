/**
 * ItemsList component
 * 
 * - Displays a list of items from the database.
 * - Allows adding, editing, and deleting items.
 * - Supports adding tags to each item.
 * - Uses modal windows for editing and creating items.
 */
import React, { useState, useEffect } from "react";
import ItemCard from "./Item-card";
import type { Item, Tag } from "./ItemsType";
import { useLocation, useNavigate } from "react-router-dom";
import EditItemModal from "./EditItemModal";
import Modal from "../UI/Modal";
import ItemForCreate from "./ItemForCreate";
import axiosClient from "api/axiosClient";
import axiosClientPg from "api/axiosClientPg";


const ItemsList: React.FC = () => {
  const usePostgres = false; 
  const client = usePostgres ? axiosClientPg : axiosClient;

  const [items, setItems] = useState<Item[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const [item, setItem] = useState<Item | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState <Tag>();

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const isCreating = searchParams.get("create") === "true";

  const [newItem, setNewItem] = useState<Item>({
    id: "",
    name: "",
    price: 0,
    store: { id: 0, name: "" },
    tags: [],
  });

  function cancelCreate() {
    navigate("/app/items"); 
    setNewItem({
      id: "",
      name: "",
      price: 0,
      store: { id: 0, name: "" },
      tags: [],
    });
  }

  function onCreateInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setNewItem((prev) => {
      const updated = { ...prev };

      switch (name) {
        case "name":
          updated.name = value;
          break;
        case "price":
          updated.price = Number(value);
          break;
        case "storeId":
          updated.store.id = Number(value);
          break;
      }
      return updated;
    });
  }

  async function saveNewItem() {
    try {
      const response = await client.post("/items", newItem);
      const created = response.data;
      setItems((prev) => [...prev, created]);
      cancelCreate();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  }

  function startEdit(id: string) {
    const myItem = items.find((item) => item.id === id);

    if (myItem) {
      console.log("Opening modal for item: ", myItem.name);
      setEditingItemId(id); 
      setItem({ ...myItem });
      setTags(myItem.tags)
      
    }
  }

  function onAddTag() {
    if (!item || !tag) return;
    setItem((prev) =>
      prev ? { ...prev, tags: [...prev.tags, tag] } : null
    );
    setTag(undefined);
  }

  function onDeleteTag(tagId: number, itemId: string) {
    if (!item) return;

    const newTags = item.tags.filter((tg) => tg.id !== tagId);
    const newItem = { ...item, tags: newTags };
    setItem(newItem);

  const updatedItems = items.map((it) =>
    it.id === itemId ? newItem : it
  );
  setItems(updatedItems);
}

  async function onDeleteItem(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      await client.delete(`/items/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (!item) return;

    setItem((prev) => {
      if (!prev) return null;

      const allTagIds = tags.map((tg) => tg.id || 0);
      const maxId = allTagIds.length > 0 ? Math.max(...allTagIds) : 0;

      const updatedItem = { ...prev };

      switch (name) {
        case "name":
          updatedItem.name = value;
          break;
        case "price":
          updatedItem.price = Number(value);
          break;
        case "tag0":
          setTag({ id: maxId + 1, name: value });
          break;
      }

      return updatedItem;
    });
  }

  function onSave(id: string) {
    if (!item) return;

    async function editItem() {
      try {
        const response = await client.put(`/items/${id}`, item);
        const updatedItem = response.data;
        console.log("Updated:", updatedItem);

        const updatedItems = items.map((it) =>
          it.id === id ? updatedItem : it
        );

        setItems(updatedItems);
        setEditingItemId(null);
        setItem(null);
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }

    editItem();
  }

  function cancelEdit() {
    setEditingItemId(null);
    setItem(null);
    setTag(undefined);
  }

  useEffect(() => {
    async function fetchItemsData() {
      try {
        const response = await client.get("/items");
        const itemsData: Item[] = response.data;
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    fetchItemsData();
  }, []);

  // JSX render
  return (
  <div className="item-page">
    <div className="item-content">
      {items.map((it) => (
        <div key={it.id} className="item-wrapper">
          <ItemCard
            item={it}
            onEdit={() => startEdit(it.id)}
            onDelete={() => onDeleteItem(it.id)}
          />
        </div>
      ))}
    </div>

    {editingItemId && item && (
      <Modal onClose={cancelEdit}>
        <EditItemModal
          item={item}
          tag={tag}
          onInputChange={onInputChange}
          onSave={() => onSave(editingItemId)}
          onAddTag={onAddTag}
          onDeleteTag={(tagId) => onDeleteTag(tagId, editingItemId)}
          onClose={cancelEdit}
        />
      </Modal>
    )}

    {isCreating && (
      <Modal onClose={cancelCreate}>
        <ItemForCreate
          item={newItem}
          tag={tag}
          onInputChange={onCreateInputChange}
          onSave={saveNewItem}
          onCancel={cancelCreate}
          onAddTag={onAddTag}
          onDeleteTag={(tagId) => onDeleteTag(tagId, newItem.id)}
        />
      </Modal>
    )}
  </div>
  );
};

export default ItemsList;
