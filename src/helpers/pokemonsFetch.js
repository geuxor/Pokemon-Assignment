const pokemonsFetch = (currentPageUrl) => {
  return fetch(currentPageUrl)
    .then((res) => {
      if (!res.ok) {
        throw Error("could not fetch the data for that resource");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err)
    });
};

// pokemonsFetch().then((response) => console.log(response));

export default pokemonsFetch;
