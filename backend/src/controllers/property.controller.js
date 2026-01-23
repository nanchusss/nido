import Property from '../models/Property.js';
import { geocodeAddress } from '../services/geocoding.service.js';

// GET /api/properties
export async function getProperties(req, res) {
  try {
    const properties = await Property.find()
      .populate('author', 'email role')
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener propiedades' });
  }
}

// POST /api/properties
export async function createProperty(req, res) {
  try {
    const {
      title,
      price,
      location,
      address,
      description,
      images,
    } = req.body;

    if (!title || !price) {
      return res.status(400).json({
        message: 'Título y precio son obligatorios',
      });
    }

    let finalLocation = location;

    // 👉 NUEVO: si viene address, geocodificamos
    if (address && !location) {
      finalLocation = await geocodeAddress(address);
    }

    if (!finalLocation) {
      return res.status(400).json({
        message: 'Ubicación o dirección es obligatoria',
      });
    }

    const property = await Property.create({
      title,
      price,
      location: finalLocation,
      address: address || null,
      description,
      images: images || [],
      author: req.user.id,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
