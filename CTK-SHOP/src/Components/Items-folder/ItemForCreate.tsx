import React from "react";
import type { Item } from "./ItemsType";

interface Props {
  item: Item;
  onSave: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; //ovo tu React.ChangeEvent<HTMLInputElement> je neka typescript shema to neznam objasniti
}

const ItemForCreate = ({ item, onSave, onInputChange }: Props) => {
  return (
    <div>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={onInputChange}
      />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={onInputChange}
      />

      <label htmlFor="storeID">Store ID</label>
      <input
        type="number"
        name="id"
        value={item.store.id}
        onChange={onInputChange}
      />

      

      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default ItemForCreate;