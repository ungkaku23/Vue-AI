const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const server = require('http').Server(app);
const path = require('path');
const io = require('./io');
io.attach(server);
const port = process.env.PORT || 3001;
//Import Function To register Our Routes in App
const { registerRoutes } = require('./routes');
//Import Function To Setting Our Environment
const { setEnvironment } = require('./config/env.js');
//Import DB Config
const { connectToDB } = require('./config/db');
var compression = require('compression');
const { setSubscribeCronJob } = require('./cron-jobs/subscribe');
const passport = require('passport');
const { applyGooglePassportStrategy } = require('./passport/google');
// const { applyLinkedInPassportStrategy } = require('./passport/linkedin');
// const { applyFacebookPassportStrategy } = require('./passport/facebook');

const { debounce } = require('debounce');
const { Server } = require('@hocuspocus/server');

let debounced;

const sockerServer = Server.configure({
  port: 1234,
  // extensions: [new RocksDB({ path: './database' })],
  async onChange(data) {
    const save = () => {};
    if (debounced) {
      debounced.clear();
    }
    debounced = debounce(() => save, 4000);
    debounced();
  },
});
sockerServer.listen();

// compress all responses
app.use(compression());

// Passport Setup
app.use(passport.initialize());
applyGooglePassportStrategy(passport);
// applyLinkedInPassportStrategy(passport);
// applyFacebookPassportStrategy(passport);
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

setEnvironment(app);
connectToDB();
registerRoutes(app);
setSubscribeCronJob();

app.use(express.static(path.resolve(__dirname, '../dist')));

// All non-API requests made to the server, for example, http://www.homepage.com/,
// will hit this request, which just returns the main layout, html file
app.get('*', (req, res) => {
  if (process.env.NODE_ENV != 'production') {
    return res.send(`Running server in ${process.env.NODE_ENV} mode.`);
  } else {
    // Returns the main index file in production environment
    return res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  }
});

server.listen(port, () => {
  console.log(
    `HelloScribe  app listening on port ${port} in ` +
      process.env.NODE_ENV +
      ' mode!'
  );
});


