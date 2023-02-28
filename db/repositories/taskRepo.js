const taskModel = require("../models/taskModel");

module.exports = class TaskRepo {
  static async findOne(obj) {
    return await taskModel.findOne(obj);
  }

  static async create(payload) {
    return await taskModel.create(payload);
  }

  static async findById(id) {
    return await taskModel.findById(id);
  }
  static async find(obj) {
    return await taskModel.find(obj);
  }

  static async findByIdAndUpdate(id, payload) {
    return await taskModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true }
    );
  }
  static async findByIdAndRemove(obj) {
    return await taskModel.findByIdAndRemove(
       obj 
    );
  }

  static async findByIdAndDelete(id) {
    return await taskModel.findByIdAndDelete(id);
  }
};
