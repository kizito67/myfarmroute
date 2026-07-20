const express = require ('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

const connectDb = require('./src/config/db');

app.use(morgan('dev'));
app.use(express.json());


const PORT = process.env.PORT || 5005;

app.get('/', (req, res) => {
  res.send('Welcome to the FarmRoute API');
});

app.use('/api/auth', require('./src/modules/auth/auth.routes'));
app.use('/api/users', require('./src/modules/user/user.routes'));

// Connect to the database
app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${PORT}`);
});