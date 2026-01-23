import fetch from 'node-fetch';

export async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}&limit=1`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'NIDO/1.0 (contact@nido.com)',
    },
  });

  const data = await response.json();

  if (!data.length) {
    throw new Error('Dirección no encontrada');
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}
