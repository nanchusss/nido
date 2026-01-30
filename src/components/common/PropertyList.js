import PropertyCard from './PropertyCard';
import { getProperties } from '../../services/propertiesService';

function PropertyList() {
  const properties = getProperties();

  return (
    <div>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export default PropertyList;
