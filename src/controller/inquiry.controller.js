// inquiry.controller.js

const service = require("../service/inquiry.service");

class InquiryController {

    async create(req, res) {
        try {
            const data =
                await service.createInquiry(req.body);

            res.status(201).json({
                success: true,
                message: "Inquiry Created",
                data
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async getAll(req, res) {
        try {
            const data =
                await service.getAllInquiries();

            res.json({
                success: true,
                data
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async updateStatus(req, res) {
        try {
            const { user_id } = req.params;
            const { status } = req.body;

            const message =
                await service.updateStatus(user_id, status);

            res.json({
                success: true,
                message
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async approve(req, res) {
        try {
            const { user_id } = req.params;
            const { email } = req.body;

            const data =
                await service.approveInquiry(
                    user_id,
                    email
                );

            res.json({
                success: true,
                message: data.message
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async notes(req, res) {
        try {
            const { user_id } = req.params;
            const { notes } = req.body;

            const data =
                await service.notesInquiry(
                    user_id,
                    notes
                );

            res.json({
                success: true,
                message: data.message
            });

        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

}

module.exports = new InquiryController();
