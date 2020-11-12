import { nextId } from "../CustomFunctions/ReadWrite.js";

export const createEvent = (userData, eventObj) => {
  const { symbol, prop, level, stat, action, actionQuantity } = eventObj;
  let newAlert;
  if (symbol && prop && level && stat && action) {
    newAlert = {
      symbol,
      prop,
      level,
      stat,
      action,
      actionQuantity,
      active: true,
      called_today: false,
      id: nextId(),
      type: "EVENT",
    };
    userData.events.events.push(newAlert);
  }
  return newAlert;
};

export const getEvent = (userData, id) => {
  return userData.events.events.find((event) => event.id === id);
};

export const deleteEvent = (userData, id) => {
  userData.events.events = userData.events.events.filter((event) => {
    if (event.id === id) {
      return false;
    }
    return true;
  });
};
