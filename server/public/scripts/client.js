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
randomNumber();
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


// function randomNumber() {
//   const contentDiv = document.getElementById("random-number");
//   contentDiv.innerHTML = '';
//   axios({
//     method: 'GET',
//     url: '/playerdata/random',
//   })
//     .then(function (response) {
//       console.log(response);
//       const dataFromServer = response.data;
//       const contentDiv = document.getElementById("random-number");
//       for (let data of dataFromServer) {
//         contentDiv.innerHTML += `
//                 <p>${data.randomNumber}</p>
//               `;
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//       alert('Something bad happened! Check the console for more details.');
//     });
// }


//RANDOM FUNCTION
function randomNumber() {
  axios({
    method: "GET",
    url: "/playerdata/random",
  }).then(function (response) {
    // response.data is a number object:
    console.log("SHOW ME THE DATA!!!!", response.data);
    
  


    document.getElementById("random-number").innerHTML = `
    <p id="random-number">Random number: ${response.data}</p>   
    `;
  });
}
//CHECK RANDOM
function checkGuess(target, guess) {
  if (guess < target) {
  return "too low!";
  }else if (guess > target) {
  return "too high"; 
  } else {
  return "correct!";
  }
  }

onReady();

