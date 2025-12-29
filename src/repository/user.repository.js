const { Registration, User } = require("../models");

class UserRepository {

  async createUser(userData) {
    const user = await User.create(userData);

    if (user.role == "trainee") {
      await Registration.create({
        user_id: user.user_id
      });
    }

    return user;
  }


  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async updateUser(id, data) {
    return await User.update(data, { where: { user_id: id } })
  }

  async deleteUser(id) {
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UserRepository();
