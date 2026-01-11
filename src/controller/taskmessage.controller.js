const taskMessageService = require("../service/taskmessage.service");

class TaskMessageController {
    async create(req, res) {
        try {
            const { taskId, message, senderId, senderRole } = req.body;

            const data = await taskMessageService.addMessage({
                taskId,
                senderId,
                senderRole,
                message,
            });

            res.status(200).json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(400).json({ message: err })
        }
    }

    async getByTask(req, res) {
        try {
            const { taskId } = req.body;
            const data = await taskMessageService.getMessages(taskId);

            res.json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(400).json({ message: err })
        }
    }
}

module.exports = new TaskMessageController();
