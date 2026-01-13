const jwt = require("jsonwebtoken");
const userService = require("../service/user.service");

/* =====================================================
   CREATE TRAINER (ADMIN)
===================================================== */
exports.createTrainer = async (req, res) => {
  try {
    const { trainer } = await userService.createTrainer(req.body);

    return res.status(200).json({
      message: "Trainer created successfully",
      trainer,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

/* =====================================================
   REGISTER (TRAINEE) → SEND WAITING TOKEN
===================================================== */
exports.register = async (req, res) => {
  try {
    const { waitingToken } = await userService.register(req.body);

    return res.status(200).json({
      message: "Registered successfully. Waiting for approval.",
      waitingToken, 
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

/* =====================================================
   LOGIN → SEND ACCESS TOKEN
===================================================== */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { accessToken, user } =
      await userService.login(email, password);

    return res.status(200).json({
      message: "Login successful",
      accessToken, 
      role: user.role,
      status: user.status,
      expiresIn:
        process.env.JWT_ACCESS_EXPIRES * 60 * 60,
    });
  } catch (err) {
    return res.status(401).json({
      message: err.message,
    });
  }
};

/* =====================================================
   CHECK WAITING STATUS
===================================================== */
exports.checkStatus = async (req, res) => {
  try {
    const { waitingToken } = req.body;

    if (!waitingToken) {
      return res.status(200).json({
        type: "none",
      });
    }

    const decoded = jwt.verify(
      waitingToken,
      process.env.JWT_WAITING_SECRET
    );

    const result =
      await userService.checkWaitingStatus(decoded.id);

    /* ---------- USER APPROVED ---------- */
    if (result.upgraded) {
      return res.status(200).json({
        type: "auth",
        accessToken: result.accessToken, 
        role: result.user.role,
        status: "approved",
        expiresIn:
          process.env.JWT_ACCESS_EXPIRES * 60 * 60,
      });
    }

    /* ---------- STILL WAITING ---------- */
    return res.status(200).json({
      type: "waiting",
      status: result.status,
    });

  } catch (err) {
    return res.status(200).json({
      type: "waiting",
      status: "pending",
    });
  }
};

/* =====================================================
   LOGOUT (FRONTEND CONTROLLED)
===================================================== */
exports.logout = async (req, res) => {
  return res.status(200).json({
    message: "Logged out successfully",
  });
};

/* =====================================================
   AUTH ME (VERIFY ACCESS TOKEN)
===================================================== */
exports.me = async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET
    );

    const user =
      await userService.getAuthUser(decoded.id);

    return res.status(200).json({
      id: user.user_id,
      role: user.role,
      status: user.status,
      type: "auth",
    });

  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
