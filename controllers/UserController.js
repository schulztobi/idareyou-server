import User from '../models/User';

const showAllUser = (req, res) => {
  User.find()
    .then((users) => {
      res.json(
        users.map((user) => ({
          _id: user._id,
          username: user.username,
          email: user.email,
        }))
      );
    })
    .catch((error) => {
      res.json({
        message: 'NoUsers',
      });
    });
};

const showSingleUser = (req, res) => {
  const { id } = req.params;
  User.find({ _id: id }).then((user) => res.json(user));
};

module.exports = {
  showAllUser,
  showSingleUser,
};
