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
  } catch (error) {
    console.error(error);
    alert("Unable to add burger");
  }
};
