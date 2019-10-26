const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const graphqlHttp = require('express-graphql');

const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const {isAuth} = require('./middleware/isAuth');

const app = express();

//env
dotenv.config({path: './config.env'});

//Middlewares
app.use(express.json());
// it will run before every request
app.use(isAuth);

//connect to DB
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-kflc5.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
        {useUnifiedTopology: true, useNewUrlParser: true},
    )
    .then(() =>
        app.listen(3000, () =>
            console.log('DB is connected, server is up on port 3000'),
        ),
    )
    .catch(err => console.log(err));

app.use(
    '/graphql',
    graphqlHttp({
        schema,
        rootValue: resolvers,
        graphiql: true,
    }),
);

//VIDEO 11
