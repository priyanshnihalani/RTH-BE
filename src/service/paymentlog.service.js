const paymentLogRepo = require("../repository/paymentlog.repository");

class PaymentLogService {
  async addLog({ batch_trainee_id, amount, receivedBy }) {
    if (!batch_trainee_id || !amount || !receivedBy) {
      throw new Error("All fields are required");
    }

    return await paymentLogRepo.create({
      batch_trainee_id,
      amount,
      receivedBy,
    });
  }

  async findAllPaymentLogs(){
    return await paymentLogRepo.findAllPaymentLogs()
  }

  async getLogs(batchTraineeId) {
    return await paymentLogRepo.findByBatchTraineeId(batchTraineeId);
  }

  async deleteLog(id) {
    return await paymentLogRepo.deleteById(id);
  }
}

module.exports = new PaymentLogService();
