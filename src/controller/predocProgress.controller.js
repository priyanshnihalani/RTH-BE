const service = require("../service/predocProgress.service");

exports.upsertProgress = async (req, res) => {
    try {
        const { user_id, module_id, status } = req.body;

        const result = await service.upsertProgress({
            user_id,
            module_id,
            status
        });

        res.status(200).json({
            message: "Progress saved successfully",
            progress: result
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

exports.getUserProgress = async (req, res) => {
    try {
        const progress = await service.getUserProgress(req.body.userId);
        res.status(200).json({ progress });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
