const models = require('../models');
const Account = models.Account;
const Dota = models.Dota;

// Directs to the browse/community page
const browsePage = (req, res) => res.render('browse', { csrfToken: req.csrfToken() });

// Gets all the accounts and returns them to the client
const getAccounts = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.find({ _id: { $nin: req.session.account._id } }, (err, accs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ accounts: accs });
  });
};

// Gets a specific account and returns it to the client
const getAccount = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.findOne({ _id: req.query.id }, (err, acc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return Dota.DotaModel.findByOwner(req.query.id, (er, docs) => {
      if (er) {
        console.log(er);
        return res.status(400).json({ error: 'An error occurred' });
      }

      return res.json({ account: acc, heroes: docs });
    });
  });
};

const getTop = (request, response) => {
  const req = request;
  const res = response;

  console.log(req);

  return Dota.DotaModel.find({}, (er, hrs) => {
    if (er) {
      console.log(er);
      return res.status(400).json({ error: 'An error occurred' });
    }
    hrs.sort((a, b) => ((a.rating < b.rating) ? 1 : -1));

    if (hrs.length > 5) {
      hrs.splice(5, hrs.length - 1);
    }

    return res.json({ heroes: hrs });
  });
};

module.exports.browsePage = browsePage;
module.exports.getAccounts = getAccounts;
module.exports.getAccount = getAccount;
module.exports.getTop = getTop;
