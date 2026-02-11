// inquiry.repository.js

const { Registration, User } = require("../models");
const { Op, where } = require("sequelize");
const sequelize = require("../../config/db");

class InquiryRepository {

  async create(data) {
    return await Registration.create(data);
  }

  async createUser(data) {
    return await User.create(data);
  }

  async findUser(user_id) {
    return await User.findByPk(user_id);
  }

  async updateUser(user_id, data) {
    return await User.update(data, {
      where: { user_id }
    });
  }

  async findAll() {
    return await Registration.findAll({
      where: {
        inquiryDate: {
          [Op.not]: null
        }
      },
      include: [
        {
          model: User,
          as: "User"
        }
      ]
    });
  }

  async findByUserId(user_id) {
    return await Registration.findOne({
      where: { user_id },
      include: [{ model: User, as: "User" }]
    });
  }

  async updateRegistration(user_id, data) {
    return await Registration.update(data, {
      where: { user_id }
    });
  }

  async getFullInquiry(user_id) {
    return await Registration.findOne({
      where: { user_id },
      include: [{ model: User, as: "User" }]
    });
  }


  async updateStatus(user_id, admissionStatus) {
    const t = await sequelize.transaction();

    try {
      await Registration.update(
        { admissionStatus },
        { where: { user_id }, transaction: t }
      );

      const userStatusMap = {
        inquiry: "inquiry",
        approved: "approved",
        pending: "pending",
        rejected: "blocked"
      };

      await User.update(
        {
          status:
            userStatusMap[admissionStatus] || "pending"
        },
        { where: { user_id }, transaction: t }
      );

      await t.commit();

    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async notesInquiry(user_id, notes) {
    try {
      return await Registration.update(
        { inquiryNotes: notes },
        { where: { user_id } }
      );
    }
    catch (err) {
      return err;
    }
  }

}

module.exports = new InquiryRepository();
