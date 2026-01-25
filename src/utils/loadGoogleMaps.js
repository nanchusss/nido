let googleMapsPromise = null;

export function loadGoogleMaps() {
  // Si Google Maps ya está cargado, resolvemos directo
  if (window.google && window.google.maps) {
    return Promise.resolve(window.google);
  }

  if (!googleMapsPromise) {
    googleMapsPromise = new Promise((resolve, reject) => {
      // Evitar inyectar el script más de una vez
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        existingScript.addEventListener('load', () => {
          resolve(window.google);
        });
        existingScript.addEventListener('error', () => {
          reject(new Error('Google Maps script failed to load'));
        });
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-maps-script';

      // 🔥 API KEY (DEBUG)
      const API_KEY = 'AIzaSyAkny4jxyq6wC2RZqwPxhkMwOfeKzCw8aE';

      // 👇 Places incluido para Autocomplete
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;

      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (window.google && window.google.maps) {
          resolve(window.google);
        } else {
          reject(new Error('Google Maps loaded but maps missing'));
        }
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google Maps script'));
      };

      document.head.appendChild(script);
    });
  }

  return googleMapsPromise;
}
