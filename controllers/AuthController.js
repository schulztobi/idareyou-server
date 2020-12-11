import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//register

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: 'success',
        });
      })
      .catch((error) => {
        console.error(error.message);
        res.json({
          message: 'User or email already taken',
        });
      });
  });
};

//login

const login = (req, res, next) => {
  console.log(req.body);
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
            let token = jwt.sign(
              { username: user.username, userId: user._id },
              process.env.TOKEN_S,
              {
                expiresIn: '1h',
              }
            );
            res.json({
              message: 'success',
              token,
            });
          } else {
            res.json({
              message: 'wrongPassword',
            });
          }
        });
      } else {
        res.json({
          message: 'noUser',
        });
      }
    }
  );
};

module.exports = {
  register,
  login,
};
