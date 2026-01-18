const paymentLogService = require("../service/paymentlog.service");

class PaymentLogController {
  async create(req, res) {
    try {
      const log = await paymentLogService.addLog(req.body);
      res.status(201).json({ success: true, data: log });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getByBatchTrainee(req, res) {
    try {
      const { batchTraineeId } = req.params;
      const logs = await paymentLogService.getLogs(batchTraineeId);
      res.json({ success: true, data: logs });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async findAllPaymentLogs(req, res) {
    try {
      const logs = await paymentLogService.findAllPaymentLogs()
      res.status(200).json({ success: true, data: logs })
    }
    catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await paymentLogService.deleteLog(id);
      res.json({ success: true, message: "Deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new PaymentLogController();
