import { useParams } from 'react-router-dom';
import { getPropertyById } from '../services/propertiesService';

function PropertyDetail() {
  const { id } = useParams();
  const property = getPropertyById(id);

  if (!property) {
    return <p>Propiedad no encontrada</p>;
  }

  return (
    <div>
      <h2>{property.title}</h2>
      <p><strong>Ubicación:</strong> {property.location}</p>
      <p><strong>Precio:</strong> {property.price.toLocaleString()} €</p>
      <p>{property.description}</p>
    </div>
  );
}

export default PropertyDetail;
