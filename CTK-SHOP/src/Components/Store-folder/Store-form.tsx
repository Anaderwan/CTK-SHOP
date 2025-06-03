import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { Store } from './Store-type'; // Dodaj ovaj import

interface Props {
  storeToEdit?: Store;
  onSave: () => void;
}

const StoreForm = ({ storeToEdit, onSave }: Props) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (storeToEdit) {
      setName(storeToEdit.name);
      setLocation(storeToEdit.location || "");
    }
  }, [storeToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storeData = { name, location };

    try {
      if (storeToEdit) {
        // UPDATE
        await axiosClient.put(`/stores/${storeToEdit.id}`, storeData);
      } else {
        // CREATE
        await axiosClient.post('/stores', storeData);
      }
      onSave(); // obavijest roditelju
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