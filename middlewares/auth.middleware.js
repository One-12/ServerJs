const fireBaseAdmin = require('firebase-admin');
const httpStatusCodes = require('http-status-codes');

const users = require('../resources/user/user.entity');

const authorize = async (req, res, next) => {
  const token = _getTokenFromHeader(req);

  if (token) {
    const authorizedUser = await _authorizeUser(token);
    if (authorizedUser) {
      req.user = authorizedUser;
      next();
      return;
    }
  }

  return res.status(httpStatusCodes.UNAUTHORIZED).json({
    error: 'Token missing',
  });
};

_authorizeUser = async(token) => {
  try {
    const fireBaseUser = await fireBaseAdmin.auth().verifyIdToken(token);

    let applicationUser = await users.findOne({ uid: fireBaseUser.sub });

    if (!applicationUser) {
      applicationUser = await users.create({
        uid: fireBaseUser.sub,
        email: fireBaseUser.email,
      });
    }

    applicationUser.isEmailVerified = fireBaseUser.email_verified;

    return applicationUser;
  } catch (err) {
    return null;
  }
}

_getTokenFromHeader = (req) => {
  if (req.headers.authorization) {
    const authorization = req.headers.authorization.split(' ')[0];
    return authorization ? req.headers.authorization.split(' ')[1] : null;
  }

  return null;
}

module.exports = authorize;
