const admin = require("firebase-admin");
const httpStatusCodes = require("http-status-codes");

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
const isAuthorized = function (req, res, next) {
  const token = getTokenFromHeader(req, res);
  if (token) {
    admin
      .auth()
      .verifyIdToken(token)
      .then((data) => {
        console.log('data', data);
        next();
      })
      .catch((err) => {
        console.log('token thappu', err);
        res.status(403).send("Unauthorized");
      });
  } else {
    res.status(403).send("Unauthorized");
  }
};

module.exports = isAuthorized;
