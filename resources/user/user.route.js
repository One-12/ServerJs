var express = require("express");
var userController = require("./user.controller");
var isAuthorized = require("../../middlewares/firebase.middleware");

var router = express.Router();

/**
 * @route POST /users Follow or Un-follow user.
 * @group users - Operations about users
 * @param {string} uid.query.required - user id to perform the action
 * @param {enum} action.query.required - Action values that need to be considered - eg: follow,unfollow
 * @returns 200
 * @returns {Error}  default - Unexpected error
 */
router.post("/", isAuthorized, userController.followOrUnFollowUser);

router.get("/isAlive", (req, res) => res.status(201).end());

module.exports = router;
