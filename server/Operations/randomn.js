export const randomInteger = (min, max) => {
  // console.log({ min, max });
  return parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
};

export const randomPrice = (min, max) => {
  return Number((Math.random() * (max - min + 1) + min).toFixed(2));
};
