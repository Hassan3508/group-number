const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5001;

// Create a new game:
const playerDataArray = []; // empty array (fresh game state)
// Create a new random integer between 1-25
const randomNumber = Math.floor(Math.random() * 26);
console.log(`new game started, answer: ${randomNumber}`);

// This must be added before GET & POST routes.
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static("server/public"));
app.use(express.json({ extended: true }));

// Write a function that takes in a number guess as the argument
// and returns 'too high', 'too low', or 'correct' based on whether
// the given number is too low, high, or exactly equal to the
// hidden game number (global constant `randomNumber`);
function processGuess(guess) {
  if (guess < randomNumber) {
    // number is too low
    console.log(`Guess of ${guess} is too low (correct: ${randomNumber})`);
    return "TOO LOW!";
  } else if (guess > randomNumber) {
    // number is too high
    console.log(`Guess of ${guess} is too high (correct: ${randomNumber})`);
    return "TOO HIGH!";
  } else {
    // number is juuuust right (goldilocks referenc)
    console.log(`Guess of ${guess} is correct`);
    return "correct";
  }
}
// GET & POST Routes go here
app.get("/playerdata", (req, res) => {
  console.log(`Processing GET game turn history`);
  res.send(playerDataArray);
});

app.post("/playerdata", (req, res) => {
  // a turn guess is an object: {answerOne, answerTwo, answerThree}
  console.log(`Processing turn request, body:`, req.body);

  // Create the object to hold the turn data
  const processedTurn = {
    answerOne: Number(req.body.answerOne),
    answerOneResult: "",
    answerTwo: Number(req.body.answerTwo),
    answerTwoResult: "",
    answerThree: Number(req.body.answerThree),
    answerThreeResult: "",
  };
  // Get player 1 guess, check for correctness, store result and the guess
  const result1 = processGuess(processedTurn.answerOne);
  console.log(`processed answer 1: ${result1}`);
  processedTurn.answerOneResult = result1;

  // Same for player 2
  const result2 = processGuess(processedTurn.answerTwo);
  console.log(`processed answer 2: ${result2}`);
  processedTurn.answerTwoResult = result2;

  // Same for player
  const result3 = processGuess(processedTurn.answerThree);
  console.log(`processed answer 3: ${result3}`);
  processedTurn.answerThreeResult = result3;

  // Push the turn to the global array (answers and results)
  playerDataArray.push(processedTurn);

  // send back a 201 created, optionally also send this current turn results
  res.status(201).send(processedTurn);
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
