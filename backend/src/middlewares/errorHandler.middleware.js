// Middleware de manejo de errores global
export const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';
  
  console.error('[ERROR]', {
    message: err.message,
    stack: isDev ? err.stack : undefined,
    path: req.path,
    method: req.method
  });
  
  // Errores de autenticación
  if (err.message === 'Token no proporcionado' || 
      err.message === 'Token inválido o expirado') {
    return res.status(401).json({ 
      error: err.message,
      ...(isDev && { details: err.stack })
    });
  }

  // Errores de credenciales/contraseña
  if (err.message === 'Invalid credentials' || 
      err.message === 'Contraseña actual incorrecta' ||
      err.message === 'Invalid password') {
    return res.status(401).json({ error: err.message });
  }

  // Errores de validación
  if (err.message.includes('already registered') ||
      err.message === 'Email already registered') {
    return res.status(409).json({ error: err.message });
  }

  // Errores de no encontrado
  if (err.message.includes('not found') ||
      err.message === 'Usuario no encontrado' ||
      err.message === 'Run not found' ||
      err.message === 'Scenario not available') {
    return res.status(404).json({ error: err.message });
  }

  // Errores de validación de datos
  if (err.message.includes('Invalid') ||
      err.message.includes('already completed')) {
    return res.status(400).json({ error: err.message });
  }

  // Error genérico
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ 
    error: isDev ? err.message : 'Error interno del servidor',
    ...(isDev && { stack: err.stack })
  });
};
