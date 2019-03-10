import ProvidersService from './ProvidersService';
const ObjectId = require('mongoose').Types.ObjectId;

class ProvidersController {

  static async getProviders(req, res) {
    try {
      let query = {};
      if (req.query.firstName) query.firstName = new RegExp(req.query.firstName, 'i');
      if (req.query.lastName) query.lastName = new RegExp(req.query.lastName, 'i');
      if (req.query.middleName) query.middleName = new RegExp(req.query.middleName, 'i');
      if (req.query.email) query.email = new RegExp(req.query.email, 'i');
      if (req.query.specialty) {
        query['specialty._id'] = { $eq: new ObjectId(req.query.specialty) }
      }
      if (req.query.employerId) query.employerId = req.query.employerId;
      if (req.query.providerType) query.providerType = req.query.providerType;
      if (req.query.staffStatus) query.staffStatus = req.query.staffStatus;
      if (req.query.assignedTo) query.assignedTo = req.query.assignedTo;
      if (req.query.status) query.status = req.query.status;
      const offset = Number(req.query.offset) || 0;
      const limit = !isNaN(req.query.limit) ? Number(req.query.limit) : false;
      const providersService = new ProvidersService();
      let response = await providersService.getProviders(query, limit, offset);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({message: err.message});
    }
  }

  static async getProvider(req, res) {
    try {
      const providersService = new ProvidersService();
      const result = await providersService.getProvider(req.params.id);
      result.success ? res.status(200).json(result.response) : res.status(500).json(result.err);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async createProvider(req, res) {
    try {
      const providersService = new ProvidersService();
      const result = await providersService.createProvider(req.body);
      result.success ? res.status(201).json(result.response) : res.status(500).json(result.err);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updateProvider(req, res) {
    try {
      const providersService = new ProvidersService();
      const result = await providersService.updateProvider(req.params.id, req.body);
      result.success ? res.status(200).json(result.response) : res.status(500).json(result.err);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteProvider(req, res) {
    try {
      const providersService = new ProvidersService();
      const result = await providersService.deleteProvider(req.params.id);
      result.success ? res.status(204) : res.status(500).json(result.err);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}

module.exports = ProvidersController;