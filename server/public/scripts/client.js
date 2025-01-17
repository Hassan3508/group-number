function onReady() {
  console.log("JavaScript is loaded!")
}


function fetchGuesses() {
  //clear old data
  const contentDiv = document.querySelector('#playerTableBody');
  contentDiv.innerHTML = '';
  axios({
    method: 'GET',
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

