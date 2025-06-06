import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import type { Store } from './Store-type';

interface Props {
  storeToEdit?: Store;
  onSave: () => void; // ne diramo ovo
}

const StoreForm = ({ storeToEdit, onSave }: Props) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState<string>(''); // unos kao string: "supermarket, discount"

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

    try {
      if (storeToEdit) {
        await axiosClient.put(`/stores/${storeToEdit.id}`, storeData);
      } else {
        await axiosClient.post('/stores', storeData);
      }
      onSave();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="box">
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
