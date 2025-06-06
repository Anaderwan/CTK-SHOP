// src/Pages/EditStore.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import StoreForm from "./Store-form";
import type { Store } from './Store-type';

const EditStore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const store = location.state?.store as Store | undefined;

  const handleSave = () => {
    alert('Trgovina je ažurirana!');
    navigate('/app/stores');
  };

  if (!store) {
    return <p>Greška: Nema podataka o trgovini za uređivanje.</p>;
  }

  return (
    <div className="container">
      <h2 className="title">Uredi trgovinu</h2>
      <StoreForm storeToEdit={store} onSave={handleSave} />
    </div>
  );
};

export default EditStore;
