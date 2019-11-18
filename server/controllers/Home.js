const models = require('../models');
const Dota = models.Dota;

// Directs to the home hero view page
const homePage = (req, res) =>
     res.render('app', { csrfToken: req.csrfToken() });

// Gets all the heroes for the current active account
const getHeroes = (request, response) => {
  const req = request;
  const res = response;

  return Dota.DotaModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ heroes: docs });
  });
};

module.exports.homePage = homePage;
module.exports.getHeroes = getHeroes;
