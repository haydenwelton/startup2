const container = document.getElementById("card-container");

const assembleBurger = (ingredients) => {
  const assembledBurger = [];
  ingredients.forEach((ingredient) => {
    const filling = document.createElement("div");
    filling.classList.add(ingredient);
    assembledBurger.push(filling);
  });
  return assembledBurger.reverse();
};

function createCards(burgers) {
  burgers.forEach((item) => {
    //Create card
    const card = document.createElement("div");
    card.classList.add("card");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    card.appendChild(wrapper);

    const burgerContainer = document.createElement("div");
    burgerContainer.id = "burger";
    burgerContainer.classList.add("burger");
    const assembledBurger = assembleBurger(item.ingredients);
    assembledBurger.forEach((e) => {
      burgerContainer.appendChild(e);
    });

    wrapper.appendChild(burgerContainer);

    //Create name element
    const name = document.createElement("h2");
    name.innerText = item.name;
    card.appendChild(name);

    //Create details element
    const details = document.createElement("p");
    details.innerText = item.description;
    card.appendChild(details);

    container.appendChild(card);
  });
}

const getMyBurgers = async () => {
  try {
    const response = await fetch("/api/burgers/myburgers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("data", response);
    createCards(await response.json());
  } catch (error) {
    console.error(error);
    alert("Unable to add burger");
  }
};

getMyBurgers();
