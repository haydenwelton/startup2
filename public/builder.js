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
  const burgerData = {
    name: burgerNameValue,
    description: burgerDescriptionValue,
    ingredients: burgerIngredients
  }
  console.log('data', burgerData)
  console.log('saving')
  console.log('resetting')
  reset()
};
