const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/user');

exports.signToken = (id) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.protect = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res
      .status(401)
      .json({ success: false, message: 'Insufficient privileges. You must be logged in.' });

  const token = authorization.split('Bearer ')[1];

  try {
    const verifyToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(verifyToken.userId);

    req.user = user;
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: `Authentication failure: ${err.message}` });
  }

  next();
};
