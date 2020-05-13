const users = require("./user.entity");

const userService = {
  followUser: async (req) => {
    const updatedUser = await users.findOneAndUpdate(
      { uid: req.user.uid },
      {
        $push: { following: req.query.uid },
      }
    );

    await users.findOneAndUpdate(
      { uid: req.query.uid },
      {
        $push: { followers: req.user.uid },
      }
    );

    return updatedUser;
  },
  unFollowUser: async (req) => {
    const updatedUser = await users.findOneAndUpdate(
      { uid: req.user.uid },
      {
        $pull: { following: req.query.uid },
      }
    );

    await users.findOneAndUpdate(
      { uid: req.query.uid },
      {
        $pull: { followers: req.user.uid },
      }
    );
    return updatedUser;
  },
};

module.exports = userService;
