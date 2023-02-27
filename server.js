const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });
const port = process.env.PORT || 3000;

//Start Server
const server = app.listen(port, () => {
  console.log(`🟢 Àpp reunning on port ${port}...`);
});
process.on('unhandleRejection', (err) => {
  console.log(err.name, err.message), server.close(() => process.exit(1));
});
