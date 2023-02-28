const userModel = require("../models/userModel");

module.exports = class UserRepo {
  static async findOneByObjSelect(obj, select) {
    return await userModel.findOne(obj).select(select);
  }

  static async create(payload) {
    return await userModel.create(payload);
  }

  static async findById(id) {
    return await userModel.findById(id);
  }
  static async find(obj) {
    return await userModel.find(obj);
  }

  static async findByIdAndUpdate(id, payload) {
    return await userModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true }
    );
  }

  static async deleteUser(id) {
    return await userModel.findByIdAndDelete(id);
  }
};
