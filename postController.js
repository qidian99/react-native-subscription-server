const addPost = ({ author, comment }) => ({
  author,
  comment,
})

let i = 0;

const posts = [];

const postController = {
  posts: async () => {
    return posts;
  },
  addPost: async ({ author, comment }) => {
    const post = addPost({ author, comment });
    posts.push(post);
    return post;
  },
}

module.exports = postController;

