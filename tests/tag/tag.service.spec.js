const { expect } = require("chai");
const mongoUnit = require("mongo-unit");
const tagUT = require("../../resources/tag/tag.service");
const mongoose = require("mongoose");

describe("tags", () => {
  const tagData = {
    tags: [
      {
        _id: "56d9bf92f9be48771d6fe5b1",
        name: "test"
      },
      {
        _id: "56d9bf92f9be48771d6fe5b2",
        name: "John"
      }
    ]
  };
  before(() => mongoose.connect(process.env.DATABASE_URL));
  beforeEach(() => mongoUnit.load(tagData));
  afterEach(() => mongoUnit.drop());

  it("should find all tags", () => {
    return tagUT.getTrendingTags().then(tags => {
      expect(tags.length).to.equal(2);
      expect(tags[0].name).to.equal("test");
    });
  });

  it("should create new tag", () => {
    const newTagName = "NewTag";
    return tagUT
      .createTag({ name: newTagName })
      .then(tag => {
        expect(tag.name).to.equal(newTagName.toLowerCase());
      })
      .then(() => tagUT.getTrendingTags())
      .then(tags => {
        expect(tags.length).to.equal(3);
        expect(tags[2].name).to.equal(newTagName.toLowerCase());
      });
  });
});
