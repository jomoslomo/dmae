const favicon = require('serve-favicon');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './landing.html'));
});

app.get('/sketch', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/sketch.js'));
});
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
