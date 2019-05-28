function googleMapsUrlify(address, action = "search") {
  const options = {
    search: "query",
    dir: "destination"
  };
  if (!Object.keys(options).includes(action))
    throw new Error(
      `invalid action. Only actions ${Object.keys(options).join(
        ", "
      )} are allowed.`
    );
  const googleMapsSearchURL = `https://www.google.com/maps/${action}/?api=1&${
    options[action]
  }=`;
  return googleMapsSearchURL + encodeURI(address);
}

export { googleMapsUrlify };
