import { nextId } from "./ReadWrite.js";
import EventModel from "../models/event.js";
import UserModel from "../models/user.js";
import mongoose from "mongoose";

export const createEvent = async (username, eventObj) => {
  const { symbol, prop, level, stat, action, type, actionQuantity } = eventObj;

  if (symbol && prop && level && stat && action && type) {
    const _id = new mongoose.Types.ObjectId();

    const newEventObj = {
      symbol,
      type,
      prop,
      level,
      stat,
      action,
      actionQuantity,
      _id,
    };

    let newEvent = new EventModel(newEventObj);
    let event2 = new EventModel({ ...newEventObj, username });

    UserModel.findOne({ username }).then(async (user) => {
      await user.events.push(newEvent);
      await user.save();
      await event2.save();
    });
    return newEvent;
  } else {
    return false;
  }
};

export const getEvent = (userData, id) => {
  return userData.events.events.find((event) => event.id === id);
};

export const deleteEvent = async (id) => {
  await UserModel.findOneAndUpdate(
    { "events._id": id },
    { $pull: { events: { _id: id } } }
  );

  return await EventModel.findOneAndDelete({ _id: id });
};
