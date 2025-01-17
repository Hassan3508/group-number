const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5001;
const playerDataArray = [];


// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
app.use(express.json({extended: true}));


// GET & POST Routes go here


app.get('/playerdata', (req, res) => {
  res.send(playerDataArray);
});

app.post('/playerdata', (req, res) => {
  console.log('Yay we did it!');
  playerDataArray.push(req.body);
  res.sendStatus(201);
});

// GET /playerdata/random to send one quote to the client
app.get('/playerdata/random', (req, res) => {
  console.log(`Processing incoming Get /playerdata/random`);
  // Generate a number between [0,1], then multiply times
  // the length of the array, then round it down
  const randomIndex = Math.floor(Math.random()*26);
  console.log(`Picked number at index ${randomIndex}`);
  res.send([randomIndex]);
  
});

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
