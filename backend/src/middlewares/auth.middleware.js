import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.cookies.authToken;
  
  if (!token) {
    console.warn('[AUTH] Token no proporcionado en request');
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      console.warn('[AUTH] Token decodificado pero sin ID de usuario');
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('[AUTH] Error verificando token:', error.message);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};