const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log(`DB is connected successfully!!`));

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application running on port ${port}....`);
});
