import React from "react";
import { useState } from "react";
import type { Item } from "./Items-Type";
import ItemForm from "./Item-form";
// import Navbar from "../Navbar-Footer/Navbar";
const CreateItem = () => {
  const [item, setItem] = useState<Item>({
    id: "",
    name: "",
    price: 0,
    store: { id: 0, name: "" },
    tags: [{ id: 0, name: "" }],
  });

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (!item) return;

    setItem((prev) => {
      const updatedItem = { ...prev };

      switch (name) {
        case "name":
          updatedItem.name = value;
          break;
        case "price":
          updatedItem.price = Number(value);
          break;
        case "storeName":
          updatedItem.store = { ...prev.store, name: value };
          break;
        case "tag0":
          updatedItem.tags = [...prev.tags];
          if (updatedItem.tags.length > 0) {
            updatedItem.tags[0] = { ...updatedItem.tags[0], name: value };
          } else {
            updatedItem.tags.push({ id: 0, name: value });
          }
          break;
        default:
          break;
      }

      return updatedItem;
    });
  }
  function onSave() {
    async function saveItem() {
      try {
        const response = await fetch("http://localhost:3000/items", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        const newItem = response.json();
        console.log(newItem);
        setItem({
          id: "",
          name: "",
          price: 0,
          store: { id: 0, name: "" },
          tags: [{ id: 0, name: "" }],
        });
      } catch (error) {
        console.log(error);
      }
    }
    saveItem();
  }
  return (
    <div>
      <ItemForm item={item} onInputChange={onInputChange} onSave={onSave} />
    </div>
  );
};

export default CreateItem;