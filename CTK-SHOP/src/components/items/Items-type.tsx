export interface Tag {
  id: number;
  name: string;
}

export interface Store {
  id: number;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  store: Store;
  tags: Tag[];
}