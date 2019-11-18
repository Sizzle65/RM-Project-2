// Ensures session is active
const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

// Ensures session is inactive
const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/home');
  }

  return next();
};

// Ensure connection is mildly secure
const requiresSecure = (req, res, next) => {
  if (req.headers['x-forward-proto'] !== 'https') {
    return res.redirect(`https//${req.hostname}${req.url}`);
  }
  return next();
};

// Allows for bypassing of security
const bypassSecure = (req, res, next) => {
  next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
