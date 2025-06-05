// Tip koji predstavlja jedan store (trgovinu)
export interface Tag {
  id?: string | number;
  name: string;
}

export interface Item {
  id: string | number;
  name: string;
  price?: number;
  store?: { id: string | number; name: string };
  tags?: Tag[];
}

export interface Store {
  id: string | number;
  name: string;
  tags?: Tag[];
  items?: Item[];
  location?: string;
}

// Tip koji se koristi za unos nove trgovine u formi (bez ID-a)
export type StoreFormData = Omit<Store, 'id'>;