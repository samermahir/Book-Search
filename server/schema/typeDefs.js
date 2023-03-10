const { gql } = require('apollo-server-express');



const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    savedBooks: [Book]
  }

  type Auth {
    user: user
    token: String
  }

  type Query {
    me(id: String, username: String): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): User
    saveBook(userId: String!, bookData: BookInput): User
    removeBook(userId: String!, bookId: String!): User
  }
`;

module.exports = typeDefs;
