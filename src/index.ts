import * as bodyParser from 'body-parser';
import * as express from 'express';
import { getValidatedNumericConfig } from './helpers/config';
import * as cors from 'cors';
import * as passport from 'passport';
import { log } from './helpers/logger';
import { getServer } from './graphql';

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '6mb' }));
app.use(bodyParser.urlencoded({ limit: '6mb', extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

app.use('/ping', (req, res) => res.send('pong'));

const server = getServer();

server.applyMiddleware({
  app,
  path: '/',
});

const port = getValidatedNumericConfig('APP_PORT');

app.listen(
  {
    port,
  },
  () => {
    log('info', `Server is running on PORT: ${port}`);
  },
);
