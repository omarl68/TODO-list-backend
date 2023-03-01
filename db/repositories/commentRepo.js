const commentModel = require("../models/commentModel");

module.exports = class CommentRepo {
  static async create(payload) {
    return await commentModel.create(payload);
  }
  static async findById(id) {
    return await commentModel.findById(id);
  }
  static async find(obj) {
    return await commentModel.find(obj);
  }

  static async findByIdAndUpdate(id, payload) {
    return await commentModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true }
    );
  }

  static async deleteComment(id) {
    return await commentModel.findByIdAndDelete(id);
  }
};
