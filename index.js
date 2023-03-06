const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const router = require('./Routes/formDataRoutes');
const { connection } = require('./config/db');
const port = process.env.PORT || 5000;

app.use('/api/form', router);

app.use(express.static(path.join(__dirname, './front/build')));
app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, './front/build/index.html'),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`server is running at ${port}`);
  } catch (err) {
    console.log('something went wrong');
  }
});
