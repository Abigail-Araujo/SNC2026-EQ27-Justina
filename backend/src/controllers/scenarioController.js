import { randomUUID } from 'crypto';
import { createScenario, deleteScenario, getAll, getScenarioById, updateScenario } from '../models/scenarioModel.js';

class ScenarioController {
  // GET /api/scenarios
  static async getAll(req, res) {
    try {
      const scenarios = await getAll();
      res.json(scenarios);
    } catch (error) {
      console.error('Error al obtener escenarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

    // GET /api/scenarios/:id
    static async getScenarioById(req, res) {
        try {
          const { id } = req.params;
          const scenario = await getScenarioById(id);
          if (!scenario) {
            return res.status(404).json({ error: 'Escenario no encontrado' });
          }
          res.json(scenario);
        } catch (error) {
          console.error('Error al obtener escenario:', error);
          res.status(500).json({ error: 'Error interno del servidor' });
        }
}

// POST /api/scenarios
  static async create(req, res) {
    try {
      const scenario = await createScenario({
        id: randomUUID(),
        ...req.body
      });

      res.status(201).json(scenario);
    } catch (error) {
      console.error('Error al crear escenario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // PATCH /api/scenarios/:id
  static async update(req, res) {
    try {
      const scenario = await updateScenario(req.params.id, req.body);
      if (!scenario) {
        return res.status(404).json({ error: 'Escenario no encontrado' });
      }
      res.json(scenario);
    } catch (error) {
      console.error('Error al actualizar escenario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // DELETE /api/scenarios/:id
  static async delete(req, res) {
    try {
      const deleted = await deleteScenario(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Escenario no encontrado' });
      }

      res.json({ message: 'Escenario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar escenario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

}

export default ScenarioController;
