const progressRepo = require("../repository/preboardProgress.repository");

class PreBoardProgressService {
  async saveProgress({
    userId,
    moduleId,
    videoId,
    lastWatchedSecond,
    progress
  }) {
    return progressRepo.upsertProgress({
      user_id: userId,
      module_id: moduleId,
      video_id: videoId,
      last_watched_second: lastWatchedSecond,
      progress,
      completed: progress >= 80
    });
  }

  async getModuleProgress(userId, moduleId) {
    return progressRepo.findByUserAndModule(userId, moduleId);
  }

  async getAllProgress(userId) {
    return progressRepo.findAllByUser(userId);
  }
}

module.exports = new PreBoardProgressService();
