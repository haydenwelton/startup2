const container2 = document.getElementById("card-allcontainer");

const assembleBurger = (ingredients) => {
    const assembledBurger = [];
    ingredients.forEach((ingredient) => {
      const filling = document.createElement("div");
      filling.classList.add(ingredient);
      assembledBurger.push(filling);
    });
    return assembledBurger.reverse();
  };
  

  function createAllCards(burgers) {
    burgers = burgers.reverse();
    burgers.forEach((item) => {
      //Create card
      const card = document.createElement("div");
      card.classList.add("card");

      const author = document.createElement("h1");
      author.innerText = item.user;
      author.style.position = 'relative'; 
      author.style.zIndex = "100"; // set higher z-index value for name element
      card.appendChild(author);
  
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
      name.style.position = 'relative'; 
      name.style.zIndex = "100"; // set higher z-index value for name element
      card.appendChild(name);
  
      //Create description element
      const description = document.createElement("p");
      description.innerText = item.description;
      description.classList.add("description"); // add description class
      if (!item.description) {
        description.innerText = "- - -"; // add space character if no description
      }
  
      // Wrap description in div for overlay
      const descriptionWrapper = document.createElement("div");
      descriptionWrapper.classList.add("description-wrapper");
      descriptionWrapper.appendChild(description);
      card.appendChild(descriptionWrapper);
  
      card.style.margin = "20px";
      card.style.overflow = "hidden";
  
      container2.appendChild(card);
    });
  }



  const getAllBurgers = async () => {
    try {
      const response = await fetch("/api/community/burgers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("data", response);
      createAllCards(await response.json());
    } catch (error) {
      console.error(error);
      alert("Didn't Retrieve all Burgers");
    }
  };


  getAllBurgers();
  