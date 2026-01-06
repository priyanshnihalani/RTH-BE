const repo = require("../repository/predocProgress.repository");

class PreDocProgressService {

  async upsertProgress({ user_id, module_id, status }) {

    const validStatuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"];

    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status value");
    }

    await repo.upsert({
      user_id,
      module_id,
      status
    });

    return {
      user_id,
      module_id,
      status
    };
  }

  async getUserProgress(user_id) {
    return repo.findAllByUser(user_id);
  }

}

module.exports = new PreDocProgressService();
