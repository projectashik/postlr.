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

export const createPOSTGQL = () => {
  return `mutation (
    $publicationId: String!, 
    $title:String!, 
    $content:String!, 
    $coverImageUrl:String,
    $tags:[TagsInput]!
  ) {
    createPublicationStory(
      publicationId:"60031f577b30c23b714a9194",
      input: {
        title: "nothitl",
        contentMarkdown: "Fake Conettn",
        tags: [],
        coverImageURL: "nothin",
      }
    ) {
      code
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

export const fetchTags = `query {
  tagCategories{
    name,
    slug,
    _id
  }
}`;
