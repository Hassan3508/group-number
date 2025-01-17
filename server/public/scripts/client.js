function onReady() {
  console.log("JavaScript is loaded!")
}

function formHandler(event) {
  event.preventDefault();
  console.log('new guesses');

  const newPlayer = {
    player1: document.getElementById('Ismail-name').value,
    player2: document.getElementById('Alex-name').value,
    player3: document.getElementById('Alecia-name').value,
  };

  console.log('newPlayer', newPlayer);

  //use axios to post to server, need the newArtist obj and where to go/ post
 // addGuess.push(newPlayer);

  //clear form fields look into the form.reset() method??
//  document.getElementById('artist-form-id').reset();
}

function addGuess(guess) {
  axios
    .post('/playerdata', guess)
    .then((response) => {
      console.log('Guesses submitted');
      //refresh the data!!!!
      //fetchArtist();
    })
    .catch((error) => {
      console.error('whoops! something went wrong with the guess post');
    });
}
function onSubmit() {
//   //clear old data
//   const contentDiv = document.querySelector('#playerTableBody');
//   contentDiv.innerHTML = '';

//   //alecia's opinion
//   event.preventDefault();
//   const newGuesses = {
//     playerOne: document.getElementById("Ismail-name").value,
//     playerTwo: document.getElementById("Alex-name").value,
//     playerThree: document.getElementById('Alecia-name').value,
//   };
//   //end alecia's rambling

  axios({
    method: 'POST',
    url: '/playerdata',
  })


    .then(function (response) {
      // Code that will run on successful response
      // from the server.
      console.log(response);
      // artistFromServer will be an Array of artists
      const playerFromServer = response.data;
      const contentDiv = document.querySelector('#playerTableBody');
      for (let players of playerFromServer) {
        contentDiv.innerHTML += `
                  <tr>
                      <td>${players.answerOne}</td>
                      <td>${players.answerTwo}</td>
                      <td>${players.answerThree}</td>
                  </tr>
              `;
      }
    })
    .catch(function (error) {
      // Code that will run on any errors from the server.
      console.log(error);
      alert('Something bad happened! Check the console for more details.');
    });
}




onReady()

