import { getAll, getScenarioById } from '../models/scenarioModel.js';

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

}

export default ScenarioController;