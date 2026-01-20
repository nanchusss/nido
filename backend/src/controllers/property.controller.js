import Property from '../models/Property.js';

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
    const { title, price, location, description, images } = req.body;

    if (!title || !price || !location) {
      return res.status(400).json({
        message: 'Título, precio y ubicación son obligatorios',
      });
    }

    const property = await Property.create({
      title,
      price,
      location,
      description,
      images: images || [],
      author: req.user.id,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear propiedad' });
  }
}
