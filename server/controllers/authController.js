const admin = require('../firebaseAdmin');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check required fields
    if (!fullName?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        message: 'Full name, email, and password are required',
      });
    }

    // Validate email format
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: 'Please provide a valid email address',
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists',
      });
    }

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Never send the password or password hash in the response
    return res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle duplicate email if simultaneous requests race
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'An account with this email already exists',
      });
    }

    console.error('Registration error:', error.message);

    return res.status(500).json({
      message: 'Unable to create account. Please try again.',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Password is excluded by default in the User model,
    // so explicitly request it for verification.
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);

    return res.status(500).json({
      message: 'Unable to log in. Please try again.',
    });
  }
};
const googleLogin = async (req, res) => {
  try {
    const authorization = req.headers.authorization || '';

    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Google authentication token is required',
      });
    }

    const idToken = authorization.slice(7);
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (!decodedToken.email || !decodedToken.email_verified) {
      return res.status(401).json({
        message: 'A verified Google email is required',
      });
    }

    const email = decodedToken.email.trim().toLowerCase();
    const fullName =
      decodedToken.name || email.split('@')[0];

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName,
        email,
        authProvider: 'google',
        googleUid: decodedToken.uid,
      });
    } else if (
      user.authProvider === 'google' &&
      user.googleUid &&
      user.googleUid !== decodedToken.uid
    ) {
      return res.status(401).json({
        message: 'Google account verification failed',
      });
    } else if (user.authProvider === 'google' && !user.googleUid) {
      user.googleUid = decodedToken.uid;
      await user.save();
    }

    return res.status(200).json({
      message: 'Google login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Google login error:', error.message);

    return res.status(401).json({
      message: 'Google login failed. Please try again.',
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
  googleLogin,
};

