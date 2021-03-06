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
    "resImages[].size":"resImages[].size",
    "resImages[].content":"resImages[].content",
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
    "[].type": "[].type",
    "[].postedBy.uid": "[].postedBy.userId",
    "[].postedBy.email": "[].postedBy.email",
  }
};

module.exports = postProfile;
