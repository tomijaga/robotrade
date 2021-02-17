export const createEvent = (userData, eventObj) => {
  userData.events.events.push(eventObj);
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
