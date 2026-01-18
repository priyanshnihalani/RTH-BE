const Certificate = require("../models/Certificate");

class CertificateRepo {
  async create(data) {
    
    return await Certificate.create(data);
  }

  async findByCertificateId(certificateId) {
    return await Certificate.findOne({
      where: { certificateId },
    });
  }
}

module.exports = new CertificateRepo();
