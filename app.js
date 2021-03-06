const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
var env = require('node-env-file');

const app = express();

// read environment file
env(__dirname + '/.env');

// allow cross-origin requests
app.use(cors());

mongoose.connect(process.env.mongoConnectionString);
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
