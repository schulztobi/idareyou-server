import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_S);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}
module.exports = verifyToken;
