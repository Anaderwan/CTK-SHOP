/**
 * StoreForm component
 * 
 * - Used for entering or editing a store via an HTML form.
 * - Supports input of name, location, and tags.
 * - Tags are entered as a comma-separated string, e.g.: "supermarket, discount".
 * 
 * Props:
 * @prop {Store} [storeToEdit] 
 * @prop {() => void} onSave 
 * @prop {() => void} [onCancel] 
 */
import { useState, useEffect } from 'react';
import axiosClient from 'api/axiosClient';
import axiosClientPg from 'api/axiosClientPg';
import type { Store } from 'Components/Store-folder/Store-type';

interface Props {
  storeToEdit?: Store;
  onSave: () => void;
  onCancel?: () => void;
  usePostgres?: boolean;
}

const StoreForm = ({ storeToEdit, onSave, usePostgres = false }: Props) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState<string>(''); 

  useEffect(() => {
    if (storeToEdit) {
      setName(storeToEdit.name);
      setLocation(storeToEdit.location || '');
      setTags(storeToEdit.tags?.map(tag => tag.name).join(', ') || '');
    }
  }, [storeToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedTags = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => ({ name: tag }));

    const storeData = {
      name,
      location,
      tags: parsedTags,
    };

    const client = usePostgres ? axiosClientPg : axiosClient;

    try {
      if (storeToEdit) {
        await client.put(`/stores/${storeToEdit.id}`, storeData);
      } else {
        await client.post('/stores', storeData);
      }
      onSave(); 
    } catch (err) {
      console.error(err);
    }
  };

  // JSX form rendering
  return (
    <form onSubmit={handleSubmit} className="box">
      {/*  */}
      <div className="field">
        <label className="label">Store Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
      </div>

      {/* t */}
      <div className="field">
        <label className="label">Tags (odvojene zarezom)</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="npr. supermarket, discount"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </div>
      </div>
      {/* */}
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary" type="submit">
            {storeToEdit ? 'Update Store' : 'Create Store'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default StoreForm;