
const container = document.getElementById("card-container");

function createCards(burgers) {
  burgers.forEach(item => {
    //Create card
    const card= document.createElement("div");
    card.classList.add("card");

    //Create name element
    const name = document.createElement("h2");
    name.innerText = item.name;
    card.appendChild(name);

    //Create details element
    const details = document.createElement("p");
    details.innerText = item.description;
    card.appendChild(details);

    container.appendChild(card);
  })
};





const getMyBurgers = async () => {
  try {
    const response = await fetch("/api/burgers/myburgers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("data", response);
    console.log(await response.json());
    createCards(await response.json());
  } catch (error) {
    console.error(error);
    alert("Unable to add burger");
  }
};
