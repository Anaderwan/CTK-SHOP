/**
 * Data types for working with stores (Store), items (Item), and tags (Tag).
 * 
 * Used within store components, forms, and API requests to ensure data structure
 * is consistent and clearly defined.
 */

/**
 * Represents a tag that can be applied to a store or item.
 * @property {number} id 
 * @property {string} name 
 */
export interface Tag {
  id: number;
  name: string;
}

/**
 * 
 * @property {number} id 
 * @property {string} name 
 * @property {number} [price] 
 * @property {{ id: string | number; name: string }} [store] 
 * @property {Tag[]} [tags] 
 */
export interface Item {
  id: number;
  name: string;
  price?: number;
  store?: { id: string | number; name: string };
  tags?: Tag[];
}

/**
 * Represents a store.
 * 
 * @property {number} id 
 * @property {string} name 
 * @property {Tag[]} [tags] 
 * @property {Item[]} [items] 
 * @property {string} [location] 
 */
export interface Store {
  id: number;
  name: string;
  tags?: Tag[];
  items?: Item[];
  location?: string;
}

export type StoreFormData = Omit<Store, 'id'>;