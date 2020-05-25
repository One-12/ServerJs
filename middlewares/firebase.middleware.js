const admin = require('firebase-admin');
const httpStatusCodes = require('http-status-codes');
const users = require('../resources/user/user.entity');

const getTokenFromHeader = (req, res) => {
  if (req.headers.authorization) {
    const authorization = req.headers.authorization.split(' ')[0];
    if (authorization === 'Bearer' || authorization === 'Fake') {
      return { token: req.headers.authorization.split(' ')[1], type: authorization };
    } else {
      res.status(httpStatusCodes.UNAUTHORIZED).json({
        error: 'Token missing',
      });
    }
  } else {
    res.status(httpStatusCodes.UNAUTHORIZED).json({
      error: 'Token missing',
    });
  }
};
const isAuthorized = async (req, res, next) => {
  const tokenResponse = getTokenFromHeader(req, res);
  const token = tokenResponse.token;
  if (!tokenResponse || !token) {
    return;
  }
  if (tokenResponse.type === 'Fake') {
    await isAuthorizedFake(req, token, res, next);
  } else {
    isAuthorizedFB(req, res, token, next);
  }
};

const isAuthorizedFB = async (req, res, token, next) => {
  const data = {};
  try {
    data = await admin.auth().verifyIdToken(token);
  } catch (err) {
    res.status(403).send('Unauthorized');
  }
  const user = await users.findOne({ uid: data.uid });
  if (user) {
    req.user = user;
  } else {
    const createdUser = await users.create({
      uid: data.uid,
      email: data.email,
    });
    req.user = createdUser;
  }
  next();
};

const isAuthorizedFake = async (req, token, res, next) => {
  const user = await users.findOne({ uid: token });
  if (user) {
    req.user = user;
  } else {
    const createdUser = await users.create({
      uid: token,
      email: `${token}@${token}.com`,
    });
    req.user = createdUser;
  }
  next();
};

module.exports = isAuthorized;
