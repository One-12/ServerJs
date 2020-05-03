const { OAuth2Client } = require("google-auth-library");
const googleConfig = require("../config.json");
const httpStatusCodes = require("http-status-codes");

const client = new OAuth2Client(
  googleConfig.google_auth.clientId,
  googleConfig.google_auth.clientSecret
);

async function verify(req, res) {
  const idToken = getTokenFromHeader(req);
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: googleConfig.google_auth.audience,
  });
  const payload = ticket.getPayload();
  return payload;
}

const getTokenFromHeader = (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  else{
    res.status(httpStatusCodes.UNAUTHORIZED).json({
      error: 'Token missing'
    })
  }
};

module.exports = async (req, res, next) => {
  try {
    var result = await verify(req, res);
    req.userId = result["sub"];
    console.log(req.userId);
    return next();
  } catch (err) {
    console.log(err);
    res.status(httpStatusCodes.UNAUTHORIZED).json({
      error: err.message
    })
  }
};
