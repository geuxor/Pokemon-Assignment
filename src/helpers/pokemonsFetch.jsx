const pokemonsFetch = (currentPageUrl) => {
  return fetch(currentPageUrl)
    .then((res) => {
      if (!res.ok) {
        throw Error("could not fetch the data for that resource");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Fetch: data", data);
      return data;
    })
    .catch((err) => {
      console.warn(err);
    });
};

pokemonsFetch().then((response) => console.log("response", response));

export default pokemonsFetch;
