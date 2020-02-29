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
    "comments[].likesCount": "comments[].likesCount",
    "comments[].replies[]._id": "comments[].replies[].id",
    "comments[].replies[].content": "comments[].replies[].content",
    "comments[].replies[].likesCount": "comments[].replies[].likesCount",
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
