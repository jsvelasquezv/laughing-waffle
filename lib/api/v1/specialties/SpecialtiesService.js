import Specialty from '../../schemas/Specialty';
const ObjectId = require('mongoose').Types.ObjectId;

class SpecialtiesService {
  async getSpecialties(query, limit, offset) {
    let aggregate = [];
    try {
      aggregate.push(
        { $match: query },
        { $skip: offset }
      );
      if (limit) aggregate.push({ $limit: limit });
      const specialties = await Specialty.aggregate(aggregate).exec();
      return {
        count: specialties.length,
        items: specialties
      };
    } catch (err) {
      return [];
    }
  }

  async getSpecialty(id) {
    try {
      let specialty = await Specialty.findById({ _id: new ObjectId(id) });
      return { success: true, response: specialty };
    } catch (error) {
      return { success: false, err: error };
    }
  }

  async createSpecialty(body) {
    let specialty = new Specialty(body);
    try {
      await specialty.save();
      return { success: true, response: specialty };
    } catch (error) {
      return { success: false, err: error };
    }
  }

  async updateSpecialty(id, body) {
    try {
      let specialty = await Specialty.findByIdAndUpdate(
        { _id: new ObjectId(id) },
        body,
        { new: true }
      );
      return { success: true, response: specialty };
    } catch (error) {
      return { success: false, err: error };
    }
  }

  async deleteSpecialty(id) {
    try {
      let specialty = await Specialty.findByIdAndDelete({ _id: new ObjectId(id) });
      return { success: true, response: specialty };
    } catch (error) {
      return { success: false, err: error };
    }
  }

}

module.exports = SpecialtiesService;
