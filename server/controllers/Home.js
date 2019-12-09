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

    const strHeroes = docs.filter((obj) => obj._doc.primaryAttribute === 'Strength');
    const intHeroes = docs.filter((obj) => obj._doc.primaryAttribute === 'Intelligence');
    const agiHeroes = docs.filter((obj) => obj._doc.primaryAttribute === 'Agility');

    return res.json({ strength: strHeroes, intelligence: intHeroes, agility: agiHeroes });
  });
};

const deleteHero = (request, response) => {
  const req = request;
  const res = response;

  return Dota.DotaModel.findByOwner(req.session.account._id, (err, heroes) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    const hero = heroes.filter((obj) => obj._doc.name === req.body.name)[0];

    Dota.DotaModel.deleteOne({ _id: hero._doc._id }, (error) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error: 'An error occurred' });
      }

      return res.status(200).json({ message: 'Success' });
    });
    return res.status(200);
  });
};

module.exports.homePage = homePage;
module.exports.getHeroes = getHeroes;
module.exports.deleteHero = deleteHero;
