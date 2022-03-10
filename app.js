var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var logger = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { authenticate } = require('./public/js/authenticate');

require('dotenv').config()

const {
  AKORDA_CLIENT_ID,
  AKORDA_CLIENT_SECRET,
  AKORDA_APP_URL,
  AUTHENTICATE_ON_CLIENT
} = process.env;

var app = express();

app.use(logger('dev'));
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const proxy = createProxyMiddleware({ target: `${AKORDA_APP_URL}`, changeOrigin: true, logLevel: 'debug' });

app.use('/api', proxy);

app.use(express.json());

app.use('/assembly-resources', express.static(__dirname + '/node_modules/@akordacorp/assembly/'));

app.get('/', async (_req, res) => {
  if (AUTHENTICATE_ON_CLIENT === 'true') return res.sendFile(path.join(`${__dirname}/views/index.html`));

  // form fields for authenticating against the Akorda Public API's authentication endpoint
  const authFormFields = {
    client_id: AKORDA_CLIENT_ID,
    client_secret: AKORDA_CLIENT_SECRET
  };

  authenticate(AKORDA_APP_URL, authFormFields).then((authResponse) => {
    const cookieOptions = {
      secure: false,
      httpOnly: true
    };

    res.cookie(
      'Authorization',
      authResponse.access_token,
      cookieOptions
    );

    if (authResponse.refresh_token) {
      res.cookie(
        'Authorization-Refresh',
        authResponse.refresh_token,
        cookieOptions
      );
    }

    res.sendFile(path.join(`${__dirname}/views/index.html`));
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
