const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { DB_USER, DB_PASS, NODE_ENV = 'development' } = process.env;

// allow cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASS}@ds245250.mlab.com:45250/my-graphql`
);
mongoose.connection.once('open', () => {
  console.log('conneted to database');
});

// bind express with graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: NODE_ENV === 'development',
  })
);

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
