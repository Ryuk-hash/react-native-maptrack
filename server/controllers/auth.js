const User = require('../models/user');
const { signToken } = require('../middlewares/auth');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing fields [email/password]. Please provide correct information.',
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: 'User already exists. Please sign in instead.',
      });
    }

    const user = await User.create({ email, password });

    const token = signToken(user._id);

    res.status(200).json({
      success: true,
      message: 'User signed up successfully.',
      token,
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing fields [email/password]. Please provide correct information.',
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isPasswordMatched = await existingUser.comparePassword(password, existingUser.password);

    if (!isPasswordMatched)
      return res.status(403).json({
        success: false,
        message: 'Invalid email or password.',
      });

    const token = signToken(existingUser._id);

    res.status(200).json({
      success: true,
      message: 'Signed the user in.',
      token,
      user: existingUser,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};
