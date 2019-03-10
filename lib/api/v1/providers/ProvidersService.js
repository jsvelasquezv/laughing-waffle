import Provider from '../../schemas/Provider';
import Specialty from '../../schemas/Specialty';

const ObjectId = require('mongoose').Types.ObjectId;

class ProvidersService {
  async getProviders(query, limit, offset) {
    let aggregate = [];
    try {
      aggregate.push(
        { $match: query },
        { $skip: offset }
      );
      if (limit) aggregate.push({ $limit: limit });
      const providers = await Provider.aggregate(aggregate).exec();
      return {
        count: providers.length,
        items: providers
      };
    } catch (err) {
      return [];
    }
  }

  async getProvider(id) {
    try {
      let provider = await Provider.findOne({ _id: new ObjectId(id)});
      return { success: true, response: provider };
    } catch (error) {
      return { success: false, err: error };
    }
  }

  async createProvider(body) {
    try {
      let specialty = await Specialty.findOne({ _id: new ObjectId(body.specialty)});
      if(specialty) {
        body.specialty = specialty;
        let provider = new Provider(body);
        await provider.save();
        return { success: true, response: provider };
      } else {
        return { success: false, err: {message: 'Specialty doesnt exist'} };
      }
    } catch (error) {
      return { success: false, err: error };
    }
  }

  async updateProvider(id, body) {
    try {
      if(body.specialty) {
        if (!ObjectId.isValid(body.specialty)) {
          return { success: false, err: { message: 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters' } };
        }
        let specialty = await Specialty.findOne({ _id: new ObjectId(body.specialty) });
        body.specialty = specialty;
        if (!specialty) return { success: false, err: { message: 'Specialty doesnt exist' } };
      }
      let provider = await Provider.findByIdAndUpdate(
        { _id: new ObjectId(id) },
        body,
        { new: true }
      );
      return { success: true, response: provider };
    } catch (error) {
      return { success: false, err: error };
    }
  }

  async deleteProvider(id) {
    try {
      let provider = await Provider.findByIdAndDelete({ _id: new ObjectId(id) });
      return { success: true, response: provider };
    } catch (error) {
      return { success: false, err: error };
    }
  }

}

module.exports = ProvidersService;
