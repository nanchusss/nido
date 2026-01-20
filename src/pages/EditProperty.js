import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getPropertyById, updateProperty } from '../services/propertiesService';
import { improveDescription } from '../services/aiService';

function EditProperty() {
  const { id } = useParams();
  const property = getPropertyById(id);

  const [title, setTitle] = useState(property?.title || '');
  const [price, setPrice] = useState(property?.price || '');
  const [location, setLocation] = useState(property?.location || '');
  const [description, setDescription] = useState(property?.description || '');
  const [improving, setImproving] = useState(false);

  if (!property) {
    return <p>Propiedad no encontrada</p>;
  }

  const handleImproveDescription = async () => {
    setImproving(true);
    const improved = await improveDescription(description);
    setDescription(improved);
    setImproving(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProperty(id, {
      title,
      price,
      location,
      description,
    });
  };

  return (
    <div>
      <h2>Editar propiedad</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label><br />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Precio</label><br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Ubicación</label><br />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Descripción</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <button
          type="button"
          onClick={handleImproveDescription}
          disabled={improving}
        >
          {improving ? 'Mejorando...' : 'Mejorar descripción con IA'}
        </button>

        <br /><br />

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

export default EditProperty;
