export const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomPrice = (min, max) => {
  return (Math.random() * (max - min + 1) + min).toFixed(2);
};
