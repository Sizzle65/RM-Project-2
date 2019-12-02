const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, mid.requiresSecure,
          mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/account', mid.requiresLogin, controllers.Account.accountInfo);
  app.patch('/changePass', mid.requiresLogin, controllers.Account.changePass);
  app.patch('/voteUp', mid.requiresLogin, controllers.Account.upvote);
  app.patch('/voteDown', mid.requiresLogin, controllers.Account.downvote);
  app.get('/home', mid.requiresLogin, controllers.Home.homePage);
  app.get('/getHeroes', mid.requiresLogin, controllers.Home.getHeroes);
  app.get('/deleteHero', mid.requiresLogin, controllers.Home.deleteHero);
  app.get('/create', mid.requiresLogin, controllers.Create.createPage);
  app.post('/createDotaCharacter', mid.requiresLogin, controllers.Create.createDotaCharacter);
  app.get('/browse', mid.requiresLogin, controllers.Browse.browsePage);
  app.get('/getAccounts', mid.requiresLogin, controllers.Browse.getAccounts);
  app.get('/getAccount', mid.requiresLogin, controllers.Browse.getAccount);
  app.get('/getTop', mid.requiresLogin, controllers.Browse.getTop);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  // Redirects on a 404
  app.get('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = router;
