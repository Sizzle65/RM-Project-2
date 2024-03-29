const models = require('../models');
const Dota = models.Dota;

// Directs to the hero creation page
const createPage = (req, res) =>
     res.render('create', { csrfToken: req.csrfToken() });

// Handles creation of a new hero
const createDotaCharacter = (req, res) => {
  const dotaData = {
    name: req.body.name,
    primaryAttribute: req.body.primAtt,
    strength: req.body.str,
    agility: req.body.agi,
    intelligence: req.body.int,
    moveSpeed: req.body.moveSpeed,
    armor: req.body.armor,
    basicName1: req.body.b1Name,
    basicDesc1: req.body.b1Desc,
    basicName2: req.body.b2Name,
    basicDesc2: req.body.b2Desc,
    basicName3: req.body.b3Name,
    basicDesc3: req.body.b3Desc,
    ultimateName: req.body.uName,
    ultimateDesc: req.body.uDesc,
    owner: req.session.account._id,
  };

  const newDota = new Dota.DotaModel(dotaData);

  const dotaPromise = newDota.save();

  dotaPromise.then(() => res.json({ redirect: '/create' }));

  dotaPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Dota character aleady exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return dotaPromise;
};

module.exports.createPage = createPage;
module.exports.createDotaCharacter = createDotaCharacter;
