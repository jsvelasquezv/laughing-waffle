import SpecialtiesService from './SpecialtiesService';

class SpecialtiesController {

  static async getSpecialties(req, res) {
    try {
      let query = {};
      if (req.query.name) query.name = new RegExp(req.query.name, 'i');
      const offset = Number(req.query.offset) || 0;
      const limit = !isNaN(req.query.limit) ? Number(req.query.limit) : false;
      const specialtiesService = new SpecialtiesService();
      let response = await specialtiesService.getSpecialties(query, limit, offset);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  static async getSpecialty(req, res) {
    try {
      const specialtiesService = new SpecialtiesService();
      const result = await specialtiesService.getSpecialty(req.params.id);
      result.success ? res.status(200).json(result.response) : res.status(500).json(result.err);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async createSpecialty(req, res) {
    try {
      const specialtiesService = new SpecialtiesService();
      const result = await specialtiesService.createSpecialty(req.body);
      result.success ? res.status(201).json(result.response) : res.status(500).json(result.err);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updateSpecialty(req, res) {
    try {
      const specialtiesService = new SpecialtiesService();
      const result = await specialtiesService.updateSpecialty(req.params.id, req.body);
      result.success ? res.status(200).json(result.response) : res.status(500).json(result.err);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteSpecialty(req, res) {
    try {
      const specialtiesService = new SpecialtiesService();
      const result = await specialtiesService.deleteSpecialty(req.params.id);
      result.success ? res.status(204) : res.status(500).json(result.err);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}

module.exports = SpecialtiesController;