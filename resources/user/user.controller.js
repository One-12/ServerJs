const userService = require('./user.service');
const httpStatusCodes = require('http-status-codes');

const userController = {
  followOrUnFollowUser: async function (req, res) {
    try {
      if (req.query.action === 'follow') {
        await userService.followUser(req);
      } else {
        await userService.unFollowUser(req);
      }
      return res.status(httpStatusCodes.OK).json({});
    } catch (err) {
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: err.message,
      });
    }
  },
};

module.exports = userController;
