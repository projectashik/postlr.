export const createTestPOSTGQL = (publicationId: string) => {
  return `mutation {
    createPublicationStory(
      publicationId: "${publicationId}", 
      input: {
        title: "Test Post from postlr.",
        contentMarkdown: "Test post",
        tags:[]
      }
    ) {
      code,
      post {
        _id
      }
    }
  }`;
};

export const deletePost = (postId: string) => {
  return `mutation {
  deletePost (id: "${postId}") {
    code
  }
}`;
};
