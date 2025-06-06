import StoreForm from './Store-form';
import { useNavigate } from 'react-router-dom';

const CreateStore = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    alert('Trgovina je spremljena!');
    navigate('/stores'); 
  };

  return (
    <div className="container">
      <h2 className="title">Dodaj novu trgovinu</h2>
      <StoreForm onSave={handleSave} />
    </div>
  );
};

export default CreateStore;
