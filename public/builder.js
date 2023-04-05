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
      addItem(filling);
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
    ingredients: burgerIngredients
  }
  console.log('data', burgerData)
  console.log('saving')
  console.log('resetting')
  saveBurger(burgerData)
  reset()
};

async function saveBurger(burgerData) {
  try {
    const response = await fetch('/api/burgers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(burgerData),
    });

    // Store what the service gave us as the high scores
    const burgers = await response.json();
    localStorage.setItem('burgers', JSON.stringify(burgers));
  } catch {
    // If there was an error then just track scores locally
    this.updateScoresLocal(burgerData);
  }
}

async function updateScoresLocal(newBurger) {
  let burgers = [];
  const burgersText = localStorage.getItem('burgers');
  if (burgersText) {
    burgers = JSON.parse(burgersText);
  }

  let found = false;
  for (const [i, prevBurger] of burgers.entries()) {
    if (newBurger > prevBurger.burger) {
      burgers.splice(i, 0, newBurger);
      found = true;
      break;
    }
  }

  if (!found) {
    burgers.push(newBurger);
  }

  if (burgers.length > 10) {
    burgers.length = 10;
  }

  localStorage.setItem('burgers', JSON.stringify(burgers));
}




function getPlayerName() {
  return localStorage.getItem('userName') ?? 'Mystery user';
}