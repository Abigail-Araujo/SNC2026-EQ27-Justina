// Middleware de manejo de errores global
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Errores conocidos de autenticación/validación
  if (err.message === 'Invalid credentials' || err.message === 'Contraseña actual incorrecta') {
    return res.status(401).json({ error: err.message });
  }
  if (err.message === 'Email already registered') {
    return res.status(409).json({ error: err.message });
  }
  if (err.message === 'Usuario no encontrado') {
    return res.status(404).json({ error: err.message });
  }
  
  // Error genérico
  res.status(500).json({ error: 'Error interno del servidor' });
};
