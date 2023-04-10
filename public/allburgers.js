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
  
          //Create name element
          const user = document.createElement("h2");
          user.innerText = item.user;
          card.appendChild(name);
  
  //Create view details button
  const viewDetails = document.createElement("button");
  viewDetails.innerText = "View Description";
  let popup = null;
  viewDetails.addEventListener("click", (event) => {
    if (popup && popup.parentNode) {
      popup.parentNode.removeChild(popup);
      popup = null;
      return;
    }
  
    popup = document.createElement("div");
    popup.classList.add("popup");
    const popupText = document.createElement("p");
    popupText.innerText = item.description;
    popup.appendChild(popupText);
  
    const rect = event.target.getBoundingClientRect();
    const buttonCenter = rect.left + rect.width / 2;
    const popupWidth = popup.offsetWidth;
    const popupLeft = buttonCenter - popupWidth / 2;
    popup.style.top = rect.top - popup.offsetHeight - 10 + "px";
    popup.style.left = Math.max(popupLeft, 10) + "px";
  
    document.body.appendChild(popup);
  });
  card.appendChild(viewDetails);
  
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
  