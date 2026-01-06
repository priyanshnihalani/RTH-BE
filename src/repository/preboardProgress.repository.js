const PreBoardVideoProgress = require("../models/PreBoardVideoProgress");

class PreBoardProgressRepository {
  upsertProgress(data) {
    return PreBoardVideoProgress.upsert(data);
  }

  findByUserAndModule(userId, moduleId) {
    return PreBoardVideoProgress.findOne({
      where: {
        user_id: userId,
        module_id: moduleId
      }
    });
  }

  findAllByUser(userId) {
    return PreBoardVideoProgress.findAll({
      where: { user_id: userId }
    });
  }
}

module.exports = new PreBoardProgressRepository();
