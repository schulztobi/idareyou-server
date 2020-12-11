import User from '../models/User';

const showAllUser = (req, res) => {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.json({
        message: 'NoUsers',
      });
    });
};

const showSingleUser = (req, res) => {
  const { id } = req.params;
  User.find({ _id: id }).then((users) => res.json(users));
};

module.exports = {
  showAllUser,
  showSingleUser,
};
