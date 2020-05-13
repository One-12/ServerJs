const { expect } = require("chai");
const mongoUnit = require("mongo-unit");
const userServiceUT = require("../../resources/user/user.service");
const userSchema = require("../../resources/user/user.entity");
var mongoose = require("mongoose");

describe("users", () => {
  const userData = {
    users: [
      {
        _id: "56d9bf92f9be48771d6fe5b1",
        uid: "prakash",
        following: ["santy"],
        email: "a@a.com",
      },
      {
        _id: "56d9bf92f9be48771d73e5b1",
        uid: "arun",
        followers: ["santy"],
        email: "b@b.com",
      },
      {
        _id: "56d9bf92f23e48771d73e5b1",
        uid: "santy",
        following: ["arun"],
        followers: ["prakash"],
        email: "b@b.com",
      },
    ],
  };
  before(() => mongoose.connect(process.env.DATABASE_URL, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }));
  beforeEach(() => mongoUnit.load(userData));
  afterEach(() => mongoUnit.drop());

  it("prakash follow arun", () => {
    const req = {
      query: {
        uid: "arun",
      },
      user: {
        uid: "prakash",
      },
    };
    return userServiceUT
      .followUser(req)
      .then((data) => userSchema.findOne({ uid: "prakash" }))
      .then((user) => {
        expect(user.following.length).to.equal(2);
        expect(user.following).to.be.an('array').that.includes('arun');
      })
      .then(() => userSchema.findOne({ uid: "arun" }))
      .then((arun) => expect(arun.followers).to.be.an('array').that.includes('prakash'));
  });

  it("prakash un-follow santy", () => {
    const req = {
      query: {
        uid: "santy",
      },
      user: {
        uid: "prakash",
      },
    };
    return userServiceUT
      .unFollowUser(req)
      .then((data) => userSchema.findOne({ uid: "prakash" }))
      .then((user) => {
        expect(user.following.length).to.equal(0);
        expect(user.following).to.be.an('array').that.does.not.includes('santy');
      })
      .then(() => userSchema.findOne({ uid: "santy" }))
      .then((santy) => expect(santy.followers).to.be.an('array').that.does.not.includes('prakash'));
  });
});
