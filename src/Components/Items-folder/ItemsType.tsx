/**
 * Data types used in the context of items (Items), stores (Stores), and tags (Tags).
 * 
 * These TypeScript interfaces define the shape of objects expected
 * when working with items – e.g., fetching items from the database, displaying them in UI components, etc.
 *
 * @property {number} id
 * @property {string} name 
 */
export interface Tag {
  id: number;
  name: string;
}

/**
 * Represents the store to which the item belongs.
 * 
 * @property {number} id 
 * @property {string} name 
 */
export interface Store {
  id: number;
  name: string;
}

/**
 * Represents a single item within the system.
 * 
 * @property {string} id 
 * @property {string} name 
 * @property {number} price 
 * @property {Store} store 
 * @property {Tag[]} tags 
 */
export interface Item {
  id: string;
  name: string;
  price: number;
  store: Store;
  tags: Tag[];
}
