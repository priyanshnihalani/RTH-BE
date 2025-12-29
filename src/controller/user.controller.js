const jwt = require("jsonwebtoken");
const userService = require("../service/user.service");

/* =====================================================
   CREATE TRAINER (ADMIN)
===================================================== */
exports.createTrainer = async (req, res) => {
  try {
    const { trainer } = await userService.createTrainer(req.body);

    res.status(200).json({
      message: "Trainer created successfully",
      trainer,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =====================================================
   REGISTER (TRAINEE)
===================================================== */
exports.register = async (req, res) => {
  try {
    const { waitingToken } = await userService.register(req.body);

    res.cookie("waitingToken", waitingToken, {
      httpOnly: true,
      secure: false,        
      sameSite: "lax",
      maxAge: process.env.JWT_WAITING_EXPIRES * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      message: "Registered successfully. Waiting for approval.",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =====================================================
   LOGIN
===================================================== */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { accessToken, user } =
      await userService.login(email, password);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: process.env.JWT_ACCESS_EXPIRES * 60 * 60 * 1000,
      path: "/",
    });

    res.clearCookie("waitingToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",
      role: user.role,
      status: user.status,
    });
    console.log()
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: err.message });
  }
};

/* =====================================================
   CHECK WAITING STATUS
===================================================== */
exports.checkStatus = async (req, res) => {
  try {
    const token = req.cookies.waitingToken;
    if (!token) {
      return res.status(200).json({ type: "none" });
    }

    const decoded = jwt.verify(
      token,
      `${process.env.JWT_WAITING_SECRET}`
    );

    const result =
      await userService.checkWaitingStatus(decoded.id);

    if (result.upgraded) {
      res.clearCookie("waitingToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });

      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: process.env.JWT_ACCESS_EXPIRES * 60 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        type: "auth",
        role: result.user.role,
        status: "approved",
      });
    }

    return res.status(200).json({
      type: "waiting",
      status: result.status,
    });

  } catch {
    return res.status(200).json({
      type: "waiting",
      status: "pending",
    });
  }
};

/* =====================================================
   LOGOUT
===================================================== */
exports.logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};

/* =====================================================
   AUTH ME
===================================================== */
exports.me = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    const user =
      await userService.getAuthUser(decoded.id);

    res.status(200).json({
      id: user.user_id,
      role: user.role,
      status: user.status,
      type: "auth",
    });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
