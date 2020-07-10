/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlogTest = /* GraphQL */ `
  subscription OnCreateBlogTest {
    onCreateBlogTest {
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
export const onUpdateBlogTest = /* GraphQL */ `
  subscription OnUpdateBlogTest {
    onUpdateBlogTest {
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
export const onDeleteBlogTest = /* GraphQL */ `
  subscription OnDeleteBlogTest {
    onDeleteBlogTest {
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
export const onCreatePostTest = /* GraphQL */ `
  subscription OnCreatePostTest {
    onCreatePostTest {
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
export const onUpdatePostTest = /* GraphQL */ `
  subscription OnUpdatePostTest {
    onUpdatePostTest {
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
export const onDeletePostTest = /* GraphQL */ `
  subscription OnDeletePostTest {
    onDeletePostTest {
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
export const onCreateCommentTest = /* GraphQL */ `
  subscription OnCreateCommentTest {
    onCreateCommentTest {
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
export const onUpdateCommentTest = /* GraphQL */ `
  subscription OnUpdateCommentTest {
    onUpdateCommentTest {
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
export const onDeleteCommentTest = /* GraphQL */ `
  subscription OnDeleteCommentTest {
    onDeleteCommentTest {
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
