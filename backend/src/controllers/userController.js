import { getAll, getById, update, deleteUser} from '../models/userModel.js';

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
