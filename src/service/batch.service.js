const batchRepository = require("../repository/batch.repository");

class BatchService {

  /* ---------- CREATE ---------- */
  createBatch(data) {
    return batchRepository.create(data);
  }

  /* ---------- GET ALL ---------- */
  async getAllBatches() {
    const batches = await batchRepository.findAllWithDetails();
    return batches
  }

  /* ---------- GET ONE ---------- */
  getBatchById(id) {
    return batchRepository.findById(id);
  }

  /* ---------- UPDATE ---------- */
  updateBatch(id, data) {
    return batchRepository.update(id, data);
  }

  /* ---------- DELETE ---------- */
  deleteBatch(id) {
    return batchRepository.delete(id);
  }
}

module.exports = new BatchService();
