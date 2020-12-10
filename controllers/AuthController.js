import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//register

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: 'User added successfullly!',
        });
      })
      .catch((error) => {
        res.json({
          message: 'An error has occured',
        });
      });
  });
};

//login

const login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ $or: [{ email: username }, { username: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, 'verySecretValue', {
              expiresIn: '1h',
            });
            res.json({
              message: 'Login successful!',
              token,
            });
          } else {
            res.json({
              message: 'Password does not match!',
            });
          }
        });
      } else {
        res.json({
          message: 'No User found!',
        });
      }
    }
  );
};

module.exports = {
  register,
  login,
};
