//require/import necessary dependencies/files
const path = require('path');
const express = require('express');
const routes = require('./controller');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// import sequelize connection
const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

// enable local server at PORT 3001
const app = express();
const PORT = process.env.PORT || 3001;

// create session and implement cookies
const sess = {
    secret: 'secret123',
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true, 
    store: new sequelizeStore({
        db: sequelize,
    })
};
app.use(session(sess));

// apply middleware
const hbs = exphbs.create({ helpers });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then(function(){


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
});

