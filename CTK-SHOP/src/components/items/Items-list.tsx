import React, { useState, useEffect } from "react";

import ItemCard from "./Item-card";
import type { Item, Tag } from "./Items-Type";
import ItemForm from "./Item-form";

const ItemsList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const [item, setItem] = useState<Item | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState <Tag>()

  function startEdit(id: string) {
    const myItem = items.find((item) => item.id === id);

    if (myItem) {
      setEditingItemId(id); // postavljamo EditingItemId na id trazenog itema(pogledaj u return kak to funkcionira)
      setItem({ ...myItem });
      setTags(myItem.tags)
      
    }
  }
  function onAddTag() {
    if(!item){
      return
    }
    
    if(!tag){
      return
    }
    const newItem = item
      newItem.tags =[...newItem.tags, tag]
      setItem(newItem)

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

  

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (!item) return;

    setItem((prev) => {
      if (!prev) return null;
      const allTagIds =tags.map(tg => {
              return tg.id
            })
            const maxId = allTagIds.length > 0 ? Math.max(...allTagIds) : 0

      const updatedItem = { ...prev }; // izrada kopije tog itema koju onda mijenjamo

      // moramo provjeriti kaj updejtamo
      // ovo je zamjena za if/else
      switch (
        name //znaaci za vrijednost ime
      ) {
        case "name": // ako je ta vrijednos name updejtamo name
          updatedItem.name = value;
          break;
        case "price":
          updatedItem.price = Number(value);
          break;
          case "tag0":
            
            setTag({id: maxId +1, name:value })


          break;
        default:
          break;
      }

      return updatedItem;
    });
  }
  function onSave(id: string) {
    if (!item) return;

    async function editItem() {
      try {
        const response = await fetch(`http://localhost:3000/items/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        const newItem = await response.json();
        console.log(newItem);
      } catch (error) {
        console.log(error);
      }
    }
    editItem();

    const updatedItems = items.map((it) => {
      if (it.id === id) {
        return item; // ako je isti id onda taj item mjenjamo
      }
      return it; // sve ostale iteme otavljamo takve kakvi jesu
    });

    setItems(updatedItems);
    setEditingItemId(null); // kad je on null izlazimo iz edit modea i prikazujemo itemCard
    setItem(null);
  }

  useEffect(() => {
    async function fetchItemsData() {
      try {
        const response = await fetch("http://localhost:3000/items");
        const itemsData: Item[] = await response.json();
        setItems(itemsData);
       
      } catch (error) {
        console.log("Error fetching items:", error);
      }
    }

    fetchItemsData();
  }, []);

  return (
    <div>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            {editingItemId === it.id && item ? ( //kad se editing item podudara sa Id-em i kad postoji item onda prikazujemo ItemForm
              <ItemForm
                item={item}
                onInputChange={onInputChange}
                onSave={() => onSave(it.id)}
                onAddTag={onAddTag}
                tag={tag}
                onDeleteTag={(tagId) => onDeleteTag(tagId, item.id)}


              />
            ) : (
              // tu prikazujemo iteme kojima nije pokrenut edit
              <div>
                <ItemCard item={it} />
                <button onClick={() => startEdit(it.id)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;