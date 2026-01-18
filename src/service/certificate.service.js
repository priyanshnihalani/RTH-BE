const CertificateRepo = require("../repository/certificate.repository");

class CertificateService {
  async createCertificate(payload) {
    return await CertificateRepo.create(payload);
  }

  async verifyCertificate(certificateId) {
    const cert = await CertificateRepo.findByCertificateId(certificateId);

    if (!cert) {
      return {
        valid: false,
        message: "Certificate not found or invalid",
      };
    }

    return {
      valid: true,
      data: cert,
    };
  }
}

module.exports = new CertificateService();
