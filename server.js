const express = require('express'); // importing a CommonJS module
const helmet = require('helmet'); // installed the package 1:

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// middleware

//custom middleware 
function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);

  next(); // allows middleware to continue to next middleware or route handler
}

// write a gatekeeper middleware that reads a password from headers and if pw is 'mellon', let it pass
//if not, send back 401 + message
function gateKeeper(req, res, next) {
  const pw = req.headers;

  if (pw === 'mellon') {
    next();
  } else {
    res.send(401).json({ message: 'Wrong Password' })
  }
}

server.use(gateKeeper);
server.use(helmet()); // use it here 2:
server.use(express.json()); // built in middleware
server.use(logger);

// endpoints 
server.use('/api/hubs', helmet(), hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get('/echo', (req, res) => {
  res.send(req.headers);
});

server.get('/area51', gateKeeper(), (req, res) => { // local middlware, applies directly on the route
  res.send(req.headers);
});



module.exports = server;
