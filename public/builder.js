
// const peerProxy = new PeerProxy("ws://localhost:4000");
// const WebSocket = require('ws');

// Instantiate a WebSocket object that connects to the server
// const ws = new WebSocket('ws://localhost:4000');


const burger = document.getElementById("burger");
const burgerName = document.getElementById("burgerName");
const burgerDescription = document.getElementById("burgerDescription");
const list = document.getElementById("burger-builder-ul");
const fillings = ["bottom-bun", "patty", "cheese", "lettuce", "ketchup", "mustard", "mayo", "tomato", "onion", "top-bun"];

const audio = new Audio("add.mp3");
const buttons = document.querySelectorAll("button");

// Data
let burgerNameValue = '';
let burgerDescriptionValue = '';
let burgerIngredients = [];

const addFilling = (fillingToAdd) => {
    burgerIngredients.push(fillingToAdd);
    burger.innerHTML = "";
    list.innerHTML = "";
    for (const burgerIngredient of burgerIngredients) {
      const filling = document.createElement('div');
      filling.classList.add(burgerIngredient);
      burger.insertBefore(filling, burger.firstChild);
      const fillingItem = document.createElement('li');
      fillingItem.textContent = burgerIngredient;
      list.insertBefore(fillingItem, list.firstChild);
    }
};

const generateButtons = () => {
  const nav = document.getElementById("buttons");
  const buttonsWrapper = document.createElement('div');

  fillings.forEach(filling => {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = filling;
    button.onclick = function() { 
      addFilling(filling);
    };
    button.addEventListener("click", () => {
    audio.play();
  });
    buttonsWrapper.appendChild(button);
  });

  nav.appendChild(buttonsWrapper);
  burger.classList.add("margin-top");
};

const reset = () => {
  burger.innerHTML = "";
  list.innerHTML = "";
  burgerIngredients = [];
  burgerName.value = ''
  burgerDescription.value = ''
} 

const handleDataInputs = () => {
  burgerName.oninput = () => {
    burgerNameValue = burgerName.value
  };
  burgerDescription.oninput = () => {
    burgerDescriptionValue = burgerDescription.value
  };
}

const start = () => {
    reset();
  generateButtons();
  handleDataInputs()

      // // establish data connection with the server
      // dataConnection = peer.connect('server');
      // dataConnection.on('open', () => {
      //     console.log('Data connection established with server');
      // });
};

const deleter = (btn) => {
  reset();
};

const create = (btn) => {
  const userName = this.getPlayerName();
  const date = new Date().toLocaleDateString();
  const burgerData = {
    user: userName,
    date: date,
    name: burgerNameValue,
    description: burgerDescriptionValue,
    ingredients: burgerIngredients,
  };
  console.log('data', burgerData)
  console.log('saving')
  console.log('resetting')
  // saveBurger(burgerData)
  submitBurger();
  const message = JSON.stringify({ type: 'userName + "created burger: " + burgerNameValue' });
  ws.send(message);
};

const submitBurger = async () => {
  const userName = this.getPlayerName();
  const date = new Date().toLocaleDateString();
  if (!burgerName.value) {
    alert('Please enter a burger name');
    return;
  }
 
  if (!burgerIngredients.length) {
    alert('Please add at least one ingredient to your burger');
    return;
  }
  try {
    const response = await fetch('/api/burger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: userName,
        date: date,
        name: burgerName.value,
        description: burgerDescription.value,
        ingredients: burgerIngredients
      })
    });
    // socket.send(JSON.stringify(burgerData));
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || 'Unable to add burger');
    }
    reset();
  } catch (error) {
    console.error(error);
    alert('Unable to add burger');
  }
 };


// async function saveBurger(burgerData) {
//   console.log("BLAM1")
//   try {
//     const response = await fetch('/api/burger', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(burgerData)
//     });
//     console.log("BLAM2")
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     console.log("BLAM3")
//     // const data = await response.json();
//     // console.log(data);
//     console.log("BLAM4")
//   } catch (error) {
//     console.error('There was a problem with the fetch operation:', error);
//   }
// }

// async function updateScoresLocal(newBurger) {
//   console.log("LOCALLY STORED")
//   let burgers = [];
//   const burgersText = localStorage.getItem('burgers');
//   if (burgersText) {
//     burgers = JSON.parse(burgersText);
//   }

//   let found = false;
//   for (const [i, prevBurger] of burgers.entries()) {
//     if (newBurger > prevBurger.burger) {
//       burgers.splice(i, 0, newBurger);
//       found = true;
//       break;
//     }
//   }

//   if (!found) {
//     burgers.push(newBurger);
//   }

//   if (burgers.length > 10) {
//     burgers.length = 10;
//   }

//   localStorage.setItem('burgers', JSON.stringify(burgers));
// }


function getPlayerName() {
  return localStorage.getItem('userName') ?? 'Mystery user';
}



// socket.onmessage = event => {
//   const data = JSON.parse(event.data);
//   const message = `${data.user} created a burger named ${data.name}`;
//   const chatLog = document.getElementById("chat-log");
//   const logEntry = document.createElement("li");
//   logEntry.textContent = message;
//   chatLog.appendChild(logEntry);
// };