const PaymentLog = require("../models/PaymentLog");

class PaymentLogRepository {
  async create(data) {
    return await PaymentLog.create(data);
  }

  async findByBatchTraineeId(batchTraineeId) {
    return await PaymentLog.findAll({
      where: { batch_trainee_id: batchTraineeId },
      order: [["receivedAt", "ASC"]],
    });
  }

  async findAllPaymentLogs() {
    return await PaymentLog.findAll();
  }

  async deleteById(id) {
    return await PaymentLog.destroy({ where: { id } });
  }
}

module.exports = new PaymentLogRepository();
