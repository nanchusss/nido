let MOCK_PROPERTIES = [
  {
    id: '1',
    title: 'Piso luminoso en Gràcia',
    price: 320000,
    location: 'Gràcia, Barcelona',
    description: 'Piso con mucha luz natural, cerca de comercios y transporte.',
  },
  {
    id: '2',
    title: 'Casa con jardín en Alella',
    price: 540000,
    location: 'Alella, Barcelona',
    description: 'Casa amplia con jardín, ideal para familias.',
  },
];

export function getProperties() {
  return MOCK_PROPERTIES;
}

export function getPropertyById(id) {
  return MOCK_PROPERTIES.find((p) => p.id === id);
}

export function createProperty(property) {
  console.log('Crear propiedad (mock):', property);
}

export function updateProperty(id, updatedData) {
  MOCK_PROPERTIES = MOCK_PROPERTIES.map((p) =>
    p.id === id ? { ...p, ...updatedData } : p
  );

  console.log('Propiedad actualizada (mock):', id, updatedData);
}

