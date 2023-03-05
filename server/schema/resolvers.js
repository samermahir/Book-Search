const { User } = require('../models');

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
},
};

module.exports = resolvers;
