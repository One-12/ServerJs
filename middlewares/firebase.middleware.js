const admin = require("firebase-admin");
const httpStatusCodes = require("http-status-codes");
const users = require("../resources/user/user.entity");
const { create } = require("../resources/user/user.entity");

const getTokenFromHeader = (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else {
    res.status(httpStatusCodes.UNAUTHORIZED).json({
      error: "Token missing",
    });
  }
};
const isAuthorized = async (req, res, next) => {
  const token = getTokenFromHeader(req, res);
  const data = {};
  if (token) {
    try {
      data = await admin.auth().verifyIdToken(token);
    } catch (err) {
      res.status(403).send("Unauthorized");
    }
    var user = await users.findOne({ uid: data.uid });
    if (user) {
      req.user = user;
    } else {
      var createdUser = await users.create({
        uid: data.uid,
        email: data.email,
      });
      req.user = createdUser;
    }
    next();
  }
};

module.exports = isAuthorized;
