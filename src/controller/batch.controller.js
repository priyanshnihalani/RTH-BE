const batchService = require("../service/batch.service");

/* ---------- CREATE ---------- */
exports.create = async (req, res) => {
  try {
    const batch = await batchService.createBatch(req.body);
    res.status(201).json({batch, message: "Batch Created!"});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ---------- VIEW ALL ---------- */
exports.findAll = async (req, res) => {
  try {
    const batches = await batchService.getAllBatches();
    res.status(200).json(batches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------- VIEW ONE ---------- */
exports.findOne = async (req, res) => {
  try {
    const batch = await batchService.getBatchById(req.params.id);
    res.json(batch);
  } catch {
    res.status(404).json({ message: "Batch not found" });
  }
};

/* ---------- UPDATE ---------- */
exports.update = async (req, res) => {
  try {
    await batchService.updateBatch(req.params.id, req.body);
    res.json({ message: "Batch updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ---------- DELETE ---------- */
exports.remove = async (req, res) => {
  try {
    await batchService.deleteBatch(req.params.id);
    res.json({ message: "Batch deleted successfully" });
  } catch {
    res.status(400).json({ message: "Unable to delete batch" });
  }
};
