const preboardService =
  require("../service/preboardProgress.service");

exports.saveVideoProgress = async (req, res) => {
  try {
    const {
      userId,
      moduleId,
      videoId,
      lastWatchedSecond,
      progress
    } = req.body;

    if (!userId || !moduleId) {
      return res.status(400).json({
        message: "userId and moduleId are required"
      });
    }

    await preboardService.saveProgress({
      userId,
      moduleId,
      videoId,
      lastWatchedSecond,
      progress
    });

    res.status(200).json({
      message: "Progress saved successfully"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllProgress = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required"
      });
    }

    const progress =
      await preboardService.getAllProgress(userId);

    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getModuleProgress = async (req, res) => {
  try {
    const { userId, moduleId } = req.body;

    if (!userId || !moduleId) {
      return res.status(400).json({
        message: "userId and moduleId are required"
      });
    }

    const progress =
      await preboardService.getModuleProgress(userId, moduleId);

    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
