const CertificateService = require("../service/certificate.service");
const { formatReadableDate } = require("../utils/formatReadableData");

class CertificateController {
  async verify(req, res) {
    try {
      const { certificateId } = req.params;

      const result = await CertificateService.verifyCertificate(certificateId);

      if (!result.valid) {
        return res.status(404).json(result);
      }

      return res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  // CREATE CERTIFICATE
  async create(req, res) {
    try {
      const payload = {...req.body, startDate: formatReadableDate(req.body.joinedDate), endDate: formatReadableDate(req.body.endDate)}
      const created = await CertificateService.createCertificate(payload);

      return res.status(201).json({
        success: true,
        data: created,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create certificate" });
    }
  }
}

module.exports = new CertificateController();
