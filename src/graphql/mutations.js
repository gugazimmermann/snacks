/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlogTest = /* GraphQL */ `
  mutation CreateBlogTest(
    $input: CreateBlogTestInput!
    $condition: ModelBlogTestConditionInput
  ) {
    createBlogTest(input: $input, condition: $condition) {
      id
      name
      posts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateBlogTest = /* GraphQL */ `
  mutation UpdateBlogTest(
    $input: UpdateBlogTestInput!
    $condition: ModelBlogTestConditionInput
  ) {
    updateBlogTest(input: $input, condition: $condition) {
      id
      name
      posts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteBlogTest = /* GraphQL */ `
  mutation DeleteBlogTest(
    $input: DeleteBlogTestInput!
    $condition: ModelBlogTestConditionInput
  ) {
    deleteBlogTest(input: $input, condition: $condition) {
      id
      name
      posts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPostTest = /* GraphQL */ `
  mutation CreatePostTest(
    $input: CreatePostTestInput!
    $condition: ModelPostTestConditionInput
  ) {
    createPostTest(input: $input, condition: $condition) {
      id
      title
      blogID
      blog {
        id
        name
        createdAt
        updatedAt
      }
      comments {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePostTest = /* GraphQL */ `
  mutation UpdatePostTest(
    $input: UpdatePostTestInput!
    $condition: ModelPostTestConditionInput
  ) {
    updatePostTest(input: $input, condition: $condition) {
      id
      title
      blogID
      blog {
        id
        name
        createdAt
        updatedAt
      }
      comments {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePostTest = /* GraphQL */ `
  mutation DeletePostTest(
    $input: DeletePostTestInput!
    $condition: ModelPostTestConditionInput
  ) {
    deletePostTest(input: $input, condition: $condition) {
      id
      title
      blogID
      blog {
        id
        name
        createdAt
        updatedAt
      }
      comments {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCommentTest = /* GraphQL */ `
  mutation CreateCommentTest(
    $input: CreateCommentTestInput!
    $condition: ModelCommentTestConditionInput
  ) {
    createCommentTest(input: $input, condition: $condition) {
      id
      postID
      post {
        id
        title
        blogID
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const updateCommentTest = /* GraphQL */ `
  mutation UpdateCommentTest(
    $input: UpdateCommentTestInput!
    $condition: ModelCommentTestConditionInput
  ) {
    updateCommentTest(input: $input, condition: $condition) {
      id
      postID
      post {
        id
        title
        blogID
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const deleteCommentTest = /* GraphQL */ `
  mutation DeleteCommentTest(
    $input: DeleteCommentTestInput!
    $condition: ModelCommentTestConditionInput
  ) {
    deleteCommentTest(input: $input, condition: $condition) {
      id
      postID
      post {
        id
        title
        blogID
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
