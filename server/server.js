const express = require('express');
const path = require('path');

const app = express();
const PORT = 3333;

// **ROUTES**
const mainCommandsRoutes = require('./routes/mainCommandsRoutes');
const containerRoutes = require('./routes/containerRoutes');

// Parse JSON request bodys
app.use(express.json());

// Always respond with the static assets
app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/commands', mainCommandsRoutes);

// ontainer request
app.use('/containers', containerRoutes);

// Send the react app 
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../build/index.html'));
});

// Local errors
app.use('*', (req, res) => {
  res.status(404);
});

// Global errors
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' }
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status((errorObj.status)).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
