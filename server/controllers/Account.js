const models = require('../models');

const Account = models.Account;
const Dota = models.Dota;

// Directs to login page
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

// Directs to login page after logging out, ends current session
const logout = (req, res) => {
  req.session.destroy();
  res.render('login');
};

// Directs to account information page
const accountInfo = (req, res) => {
  res.render('account');
};

// Handles login
const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);
    return res.json({ redirect: '/home' });
  });
};

// Handles signup
const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/home' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error ocurred' });
    });
  });
};

// Handles password change for the active account
const changePass = (request, response) => {
  const req = request;
  const res = response;

  // Checks for proper input, errors if not
  if (!req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Authenticates the input password to ensure it isn't a match
  return Account.AccountModel.authenticate(req.session.account.username, req.body.pass,
    (err, account) => {
      if (err) {
        return res.status(401).json({ error: 'An error occurred' });
      }
      if (account) {
        return res.status(401).json({ error: 'Input password equals old password' });
      }

      // Generates a new hash for the new password
      return Account.AccountSchema.statics.generateHash(req.body.pass, (salt, hash) =>
       Account.AccountModel.findOne({ _id: req.session.account._id }, (er, acc) => {
         if (er) {
           console.log(er);
           return res.status(400).json({ error: 'An error occurred' });
         }
         const accVar = acc;
         accVar.salt = salt;
         accVar.password = hash;

         // Saves the new account information
         const promise = accVar.save();

         promise.then(() => {
           req.session.account = Account.AccountModel.toAPI(accVar);
           return res.json({ account: accVar });
         });

         promise.catch((e) => {
           console.log(e);

           return res.status(400).json({ error: 'An error ocurred' });
         });
         return res.status(200).json({ message: 'Success' });
       }));
    });
};

const upvote = (request, response) => {
  const req = request;
  const res = response;

  Account.AccountModel.findOne({ username: req.body.account }, (er, acc) => {
    if (er) {
      console.log(er);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return Dota.DotaModel.findByOwner(acc._id, (err, heroes) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occurred' });
      }

      const hero = heroes.filter((obj) => obj._doc.name === req.body.name)[0];
      const updatedRating = ++hero._doc.rating;

      Dota.DotaModel.findOneAndUpdate({ _id: hero._doc._id },
      { rating: updatedRating },
      (error) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error: 'An error occurred' });
        }

        return res.status(200).json({ rating: updatedRating });
      });
      return res.status(200).json({ message: 'Success' });
    });
  });
};

const downvote = (request, response) => {
  const req = request;
  const res = response;

  Account.AccountModel.findOne({ username: req.body.account }, (er, acc) => {
    if (er) {
      console.log(er);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return Dota.DotaModel.findByOwner(acc._id, (err, heroes) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occurred' });
      }

      const hero = heroes.filter((obj) => obj._doc.name === req.body.name)[0];
      const updatedRating = --hero._doc.rating;

      Dota.DotaModel.findOneAndUpdate({ _id: hero._doc._id },
      { rating: updatedRating },
      (error) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error: 'An error occurred' });
        }

        return res.status(200).json({ rating: updatedRating });
      });
      return res.status(200).json({ message: 'Success' });
    });
  });
};

// Gets the csrf token
const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.accountInfo = accountInfo;
module.exports.changePass = changePass;
module.exports.upvote = upvote;
module.exports.downvote = downvote;
module.exports.getToken = getToken;
