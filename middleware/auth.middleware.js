import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

/**
 * Middleware to authenticate JWT and optionally restrict by role.
 * @param {Array} allowedRoles - Array of roles allowed to access the route. Example: ['student', 'tpo_admin']
 */
const authenticateToken = (allowedRoles = []) => async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ msg: 'Login Required!' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ msg: 'Token is not valid! Please Login.' });

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      return res.status(403).json({ msg: 'Access Denied! Insufficient permissions.' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Session Expired! Please Login Again.' });
    }
    console.error('auth.middleware.js =>', error);
    return res.status(401).json({ msg: 'Please Login First' });
  }
};

export default authenticateToken;