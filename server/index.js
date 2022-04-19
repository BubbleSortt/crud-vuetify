const express =  require('express');
const cors = require('cors');
const rest = require('./rest/rest');
const sequelize = require('./services/connection');
const app = express();
const port = 3000;

app.use(cors({
  origin: '*',
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

sequelize
  .authenticate()
  .then((res) => console.log(res, 'DB connect'))
  .catch((err) => console.log(err, 'DB not connect'))

app.use('/rest', rest);

app.listen(port);
