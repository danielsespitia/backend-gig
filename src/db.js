const mongoose = require('mongoose');

function connect() {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gig'
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(mongoURI, options);

  mongoose.connection.once('open', () =>
    console.log('Connection established sucessfully')
  );
  mongoose.connection.on('error', (err) =>
    console.log('Something went wrong', err)
  );
  return mongoose.connection;
}

module.exports = { connect }