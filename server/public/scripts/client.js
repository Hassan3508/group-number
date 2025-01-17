function onReady() {
  console.log("JavaScript is loaded!");
  // TODO: Fetch all guesses when page loads
  fetchGuess();

}

function formHandler(event) {
  event.preventDefault();
  console.log("new guesses");
  const newPlayer = {
    answerOne: document.getElementById("Ismail-name").value,
    answerTwo: document.getElementById("Alex-name").value,
    answerThree: document.getElementById("Alecia-name").value,
  };
  document.getElementById("form").reset();
  addGuess(newPlayer);
}

function addGuess(guess) {
  axios
    .post("/playerdata", guess)
    .then((response) => {
      console.log("Guesses submitted");
      fetchGuess();
    })
    .catch((error) => {
      console.error("whoops! something went wrong with the guess post");
    });
}

function fetchGuess() {
  const contentDiv = document.querySelector("#playerTableBody");
  contentDiv.innerHTML = "";
  axios({
    method: "GET",
    url: "/playerdata",
  })
    .then(function (response) {
      console.log(response);
      const playerFromServer = response.data;
      const contentDiv = document.querySelector("#playerTableBody");

      // TODO: Add the guess results too
      for (const player of playerFromServer) {
        contentDiv.innerHTML += `
        <tr>
        <td>${player.answerOne} -- ${player.answerOneResult}</td>
        <td>${player.answerTwo} -- ${player.answerTwoResult} </td>
        <td>${player.answerThree} -- ${player.answerThreeResult}</td>
        </tr>
        `;
      }

      // Grab the last turn (last in the turn history array)
      // Check all three answers - if they are correct, alert a message
      // showing which player won (and then add a style or something to the page)
      const mostRecentTurn = response.data[response.data.length-1];
      if(mostRecentTurn.answerOneResult === 'correct') {
        // player 1 won
        alert(`player 1 is the winner!`);
        // do something with styling here!
      } else if (mostRecentTurn.answerTwoResult === 'correct'){
        // player 2 won
        alert(`player 2 is the winner!`);
      } else if (mostRecentTurn.answerThreeResult === 'correct') {
        // player 3 won
        alert(`player 3 is the winner!`);
      }
    }).catch(function (error) {
      console.log(error);
      alert("Something bad happened! Check the console for more details.");
    });
}

onReady();