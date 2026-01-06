const PreDocProgress = require("../models/PreDocProgress");

class PreDocProgressRepository {

  upsert(data) {
    return PreDocProgress.upsert(data);
  }

  findAllByUser(user_id) {
    return PreDocProgress.findAll({
      where: { user_id }
    });
  }

}

module.exports = new PreDocProgressRepository();
