const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/user.repository");
const { sendCredentials } = require("../utils/sendEmail");

class UserService {

  /* ---------- CREATE TRAINER (ADMIN) ---------- */
  async createTrainer(data) {
    const { name, email } = data
    const exists = await userRepository.findByEmail(email);
    if (exists) throw new Error("Email already exists");

    const { generatePassword } = require("../utils/generatePassword");
    const plainPassword = generatePassword();

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const trainer = await userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role: "trainer",
      status: "approved"
    });

    await sendCredentials(email, plainPassword)

    return {
      trainer
    };
  }

  /* ---------- REGISTER ---------- */
  async register(data) {
    const exists = await userRepository.findByEmail(data.email);
    if (exists) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.createUser({
      ...data,
      password: hashedPassword,
      status: "pending",
      role: "trainee"
    });

    const waitingToken = jwt.sign(
      { id: user.user_id, type: "waiting" },
      `${process.env.JWT_WAITING_SECRET}`,

      { expiresIn: `${process.env.JWT_WAITING_EXPIRES}h` }
    );

    return { waitingToken };
  }

  /* ---------- LOGIN ---------- */
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid email or password");

    if (user.status === "pending") {
      throw new Error("Account pending approval");
    }

    if (user.status === "blocked") {
      throw new Error("Account blocked");
    }

    const accessToken = jwt.sign(
      { id: user.user_id, role: user.role, type: "auth" },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: `${process.env.JWT_ACCESS_EXPIRES}h` }
    );

    const safeUser = user.toJSON();
    delete safeUser.password;

    return { accessToken, user: safeUser };
  }

  /* ---------- CHECK WAITING STATUS ---------- */
  async checkWaitingStatus(userId) {
    const userModel = await userRepository.findById(userId);
    if (!userModel) throw new Error("User not found");

    const user = userModel.get({ plain: true });
    if (user.status === "approved") {
      const accessToken = jwt.sign(
        { id: user.user_id, role: user.role, type: "auth" },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: `${process.env.JWT_ACCESS_EXPIRES}m` }
      );
      return {
        upgraded: true,
        accessToken,
        user,
      };
    }

    return {
      upgraded: false,
      status: user.status,
    };
  }


  /* ---------- AUTH USER ---------- */
  getAuthUser(id) {
    return userRepository.findById(id);
  }

}

module.exports = new UserService();
