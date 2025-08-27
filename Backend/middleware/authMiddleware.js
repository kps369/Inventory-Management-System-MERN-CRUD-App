const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // The token is expected to be in the format "Bearer <token>"
  const token_parts = token.split(' ');
  if (token_parts.length !== 2 || token_parts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
  const actual_token = token_parts[1];

  // Verify token
  try {
    const decoded = jwt.verify(actual_token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
