import { randomUUID } from 'crypto';
import {
  createProcedure,
  deleteProcedure,
  getAll,
  getProcedureById,
  updateProcedure
} from '../repositories/procedureModel.js';

class ProcedureController {
  static async getAll(req, res) {
    try {
      const procedures = await getAll();
      res.json(procedures);
    } catch (error) {
      console.error('Error al obtener procedimientos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async getProcedureById(req, res) {
    try {
      const { id } = req.params;
      const procedure = await getProcedureById(id);
      if (!procedure) {
        return res.status(404).json({ error: 'Procedimiento no encontrado' });
      }
      res.json(procedure);
    } catch (error) {
      console.error('Error al obtener procedimiento:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async create(req, res) {
    try {
      const procedure = await createProcedure({
        id: randomUUID(),
        ...req.body
      });

      res.status(201).json(procedure);
    } catch (error) {
      console.error('Error al crear procedimiento:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async update(req, res) {
    try {
      const procedure = await updateProcedure(req.params.id, req.body);
      if (!procedure) {
        return res.status(404).json({ error: 'Procedimiento no encontrado' });
      }
      res.json(procedure);
    } catch (error) {
      console.error('Error al actualizar procedimiento:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await deleteProcedure(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Procedimiento no encontrado' });
      }

      res.json({ message: 'Procedimiento eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar procedimiento:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default ProcedureController;
