const batchRepository = require("../repository/batch.repository");

class BatchService {

  /* ---------- CREATE ---------- */
  createBatch(data) {
    return batchRepository.create(data);
  }

  /* ---------- GET ALL ---------- */
  async getAllBatches() {
    const batches = await batchRepository.findAllWithDetails();

    return batches.map(b => {
      const plain = b.get({ plain: true });

      return {
        id: plain.id,
        name: plain.name,
        technology: plain.technology,
        startDate: plain.startDate,
        endDate: plain.endDate,
        traineeCount: Number(plain.traineeCount),
        trainerName: plain.Users?.[0]?.name || "Not Assigned"
      };
    });
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
