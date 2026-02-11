import { randomUUID } from 'crypto';
import { getAll, getById, create, update, deleteUser, getByEmail } from '../models/userModel.js';

class UserController {
  // GET /api/users
  static async getAll(req, res) {
    try {
      const users = await getAll();
      res.json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // GET /api/users/:id
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await getById(id);
      
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      res.json(user);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // POST /api/users
  static async create(req, res) {
    try {
      const { email, full_name, password_hash } = req.body;
      
      if (!email || !full_name) {
        return res.status(400).json({ error: 'Email y nombre completo son requeridos' });
      }

      // Verificar si el email ya existe
      const existingUser = await getByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }

      const id = randomUUID();
      const user = await create({ id, email, full_name, password_hash });
      
      res.status(201).json(user);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // PUT /api/users/:id
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { email, full_name, status } = req.body;
      
      const user = await update(id, { email, full_name, status });
      
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      res.json(user);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // DELETE /api/users/:id
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await deleteUser(id);
      
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default UserController;
