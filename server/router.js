const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, mid.requiresSecure,
          mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/home', mid.requiresLogin, controllers.Home.homePage);
  app.get('/getHeroes', mid.requiresLogin, controllers.Home.getHeroes);
  app.get('/create', mid.requiresLogin, controllers.Create.createPage);
  app.post('/createDotaCharacter', mid.requiresLogin, controllers.Create.createDotaCharacter);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
