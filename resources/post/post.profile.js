const postProfile = {
  postByIdMap: {
    _id: "id",
    views: "views",
    points: "points",
    tags: "tags",
    commentsCount: "commentsCount",
    likesCount: "likesCount",
    content: "content",
    title: "title",
    postedOn: "postedOn",
    type: "type",
    "comments[]._id": "comments[].id",
    "comments[].postId": "comments[].postId",
    "comments[].content": "comments[].content",
    "comments[].likesCount": "comments[].likesCount"
  },

  posts: {
    "[]._id": "[].id",
    "[].views": "[].views",
    "[].points": "[].points",
    "[].tags": "[].tags",
    "[].commentsCount": "[].commentsCount",
    "[].likesCount": "[].likesCount",
    "[].content": "[].content",
    "[].title": "[].title",
    "[].postedOn": "[].postedOn",
    "[].type": "[].type"
  }
};

module.exports = postProfile;
