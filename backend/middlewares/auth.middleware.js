import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function authRequired(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔧 normalizamos req.user
    req.user = {
      id: decoded.sub,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export function roleRequired(allowedRoles) {
  return async (req, res, next) => {
    try {
      // 🔧 buscamos el role real en DB
      const user = await User.findById(req.user.id);

      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'No autorizado' });
      }

      // enriquecemos req.user
      req.user.role = user.role;

      next();
    } catch (error) {
      return res.status(403).json({ message: 'No autorizado' });
    }
  };
}
