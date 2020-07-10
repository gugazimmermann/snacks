/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlogTest = /* GraphQL */ `
  query GetBlogTest($id: ID!) {
    getBlogTest(id: $id) {
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
export const listBlogTests = /* GraphQL */ `
  query ListBlogTests(
    $filter: ModelBlogTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostTest = /* GraphQL */ `
  query GetPostTest($id: ID!) {
    getPostTest(id: $id) {
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
export const listPostTests = /* GraphQL */ `
  query ListPostTests(
    $filter: ModelPostTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        blogID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommentTest = /* GraphQL */ `
  query GetCommentTest($id: ID!) {
    getCommentTest(id: $id) {
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
export const listCommentTests = /* GraphQL */ `
  query ListCommentTests(
    $filter: ModelCommentTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
