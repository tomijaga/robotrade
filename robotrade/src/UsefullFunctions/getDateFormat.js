const getDateFormat = (todaysDate) => {
  let x = todaysDate.getDate();
  let y = todaysDate.getMonth() + 1;
  let z = todaysDate.getFullYear();

  x = x < 10 ? "0" + x : x;
  y = y < 10 ? "0" + y : y;

  return `${z}-${y}-${x}`;
};

export default getDateFormat;
