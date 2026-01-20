import { useState } from 'react';
import { createProperty } from '../services/propertiesService';
import { improveDescription } from '../services/aiService';

function NewProperty() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [improving, setImproving] = useState(false);

  const handleImproveDescription = async () => {
    if (!description) return;

    setImproving(true);
    const improved = await improveDescription(description);
    setDescription(improved);
    setImproving(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createProperty({
      title,
      price,
      location,
      description,
    });
  };

  return (
    <div>
      <h2>Publicar nueva propiedad</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label><br />
          <input
            type="text"
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
            type="text"
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
          disabled={improving || !description}
        >
          {improving ? 'Mejorando...' : 'Mejorar descripción con IA'}
        </button>

        <br /><br />

        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}

export default NewProperty;

