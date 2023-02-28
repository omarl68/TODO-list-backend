const commentModel = require("../models/commentModel");

module.exports = class CommentRepo {

  static async create(payload) {
    return await commentModel.create(payload);
  }

};
