const getTime = (date) => {
  let options = { weekday: "long", day: "numeric", month: "long" };
  if(!date) date = new Date();
  else {
    date = new Date(date);
    options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  }
  return date.toLocaleDateString("es-ES", options);
}

export { getTime };