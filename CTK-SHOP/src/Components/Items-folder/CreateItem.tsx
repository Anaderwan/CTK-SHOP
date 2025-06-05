import React from "react";
import { useState } from "react";
import type { Item } from "./ItemsType";
import ItemForCreate from "./ItemForCreate";
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
    const myId = Number(value);

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
        case "id":
          
          updatedItem.store = { ...prev.store, id: myId };
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
      <ItemForCreate item={item} onInputChange={onInputChange} onSave={onSave} />
    </div>
  );
};

export default CreateItem;