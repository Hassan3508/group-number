function onReady() {
  console.log("JavaScript is loaded!")

}


function formHandler(event) {
  event.preventDefault();
  console.log('new guesses', );
  const newPlayer = {
    answerOne: document.getElementById('Ismail-name').value,
    answerTwo: document.getElementById('Alex-name').value,
    answerThree: document.getElementById('Alecia-name').value,

  };
  document.getElementById('form').reset();
  
addGuess(newPlayer);
  console.log('newPlayer', newPlayer);
  
}


function addGuess(guess) {
  axios
    .post('/playerdata', guess)
    .then((response) => {
      console.log('Guesses submitted');
      fetchGuess();
    })
    .catch((error) => {
      console.error('whoops! something went wrong with the guess post');
    });
    
}


function fetchGuess() {
  const contentDiv = document.querySelector('#playerTableBody');
  contentDiv.innerHTML = '';
  axios({
    method: 'GET',
    url: '/playerdata',
  })
    .then(function (response) {
      console.log(response);
      const playerFromServer = response.data;
      const contentDiv = document.querySelector('#playerTableBody');
      for (let player of playerFromServer) {
        contentDiv.innerHTML += `
                  <tr>
                      <td>${player.answerOne}</td>
                      <td>${player.answerTwo}</td>
                      <td>${player.answerThree}</td>
                  </tr>
              `;
      }
    })
    .catch(function (error) {
      console.log(error);
      alert('Something bad happened! Check the console for more details.');
    });
}





onReady();

