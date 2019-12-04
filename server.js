const express = require('express'); // importing a CommonJS module
const helmet = require('helmet'); // installed the package 1:

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// middleware 
// server.use(helmet()); // use it here 2:
server.use(express.json()); // built in middleware

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

server.get('/area51', helmet(), (req, res) => { // local middlware, applies directly on the route
  res.send(req.headers);
});



module.exports = server;
