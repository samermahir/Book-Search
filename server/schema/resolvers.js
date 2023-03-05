const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, { id, username }) => {
        const foundUser = await User.findOne({
            $or: [{ _id: id },
                 { username }],
          });
      
          if (!foundUser) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
          }
      return foundUser;
    },
  },

  Mutations: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);

    return { token, user };
  },

    login: async (parent, {  email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  saveBook: async(parent, {bookData }, context) => {
    
    if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: bookData } },
        { new: true }
      );
      return updatedUser;
  }
  return res.status(400).json({ message: 'book not saved' });
},

deleteBook: async (parent, {bookId}, context) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: context.user._id },
    { $pull: { savedBooks: { bookId } } },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ message: "Couldn't find user with this id!" });
  }
  return res.json(updatedUser);
},
  },
};

module.exports = resolvers;
