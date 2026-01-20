import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{property.title}</h3>
      <p>{property.location}</p>
      <strong>{property.price.toLocaleString()} €</strong>

      <div>
        <Link to={`/properties/${property.id}`}>Ver detalle</Link>
      </div>
    </div>
  );
}

export default PropertyCard;
