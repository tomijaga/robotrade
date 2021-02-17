import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from "body-parser";
import {
  nextId,
  readCustomerFile,
  writeToCustomerFile,
} from "../RouteFunctions/ReadWrite.js";
import { auth } from "../RouteFunctions/Authorize.js";
import {
  createEvent,
  getEvent,
  deleteEvent,
} from "../RouteFunctions/eventFunctions.js";
import UserModel from "../models/user.js";
import EventModel from "../models/event.js";
import mongoose from "mongoose";
import { isIdValid } from "../RouteFunctions/Authorize.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
  const { username } = req.session;

  UserModel.findOne({ username }).then((user) => {
    console.log("getting " + username + "'s events:");
    console.log(user.events);
    res.status(200).json(user.events);
  });
});

router.get("/:id", isIdValid, (req, res) => {
  const { username } = req.session;
  let id = req.params.id;

  if (mongoose.Types.ObjectId.isValid(id)) {
    id = mongoose.Types.ObjectId(id);
    if (EventModel.exists({ _id: id })) {
      EventModel.findById({ _id: id }).then((event) => {
        console.log("getting " + username + "'s event with id[" + id + "]");
        console.log(event);
        res.status(200).json(event);
      });
    } else {
      console.log("There is no Record of this event");
      return res.status(404).send("There is no Record of this event");
    }
  } else {
    console.log("ID entered is Invalid");
    res.status(400).json("ID entered is Invalid");
  }
});

router.post("/", (req, res) => {
  let username = req.session.username;
  const eventObj = req.body;

  createEvent(username, eventObj).then((newEvent) => {
    if (newEvent) {
      console.log("Event Created", newEvent);
      return res.status(200).json(newEvent);
    } else {
      console.log("Insufficient Info: Alert could not be created");
      return res
        .status(400)
        .send("Insufficient Info: Alert could not be created");
    }
  });
});

router.put("/", async (req, res) => {
   let id = req.body.id;
  let username = req.session.username;
  let eventIsActive = req.body.eventIsActive;

 if (mongoose.Types.ObjectId.isValid(id)) {
    id = mongoose.Types.ObjectId(id);
  } else {
    console.log("Invalid Id (" + id + ")");
    return res.status(400).send("Invalid Id");
  }
  
  if (typeof eventIsActive === "boolean") {
    console.log({id});
    if (await EventModel.exists({ _id: id })) {
      UserModel.findOneAndUpdate(
        { "events._id": id },
        { $set: { "events.$.active": eventIsActive } },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(
              "event.active of '" + id + "' changed to " + eventIsActive
            );
            res.status(200).json({ id, eventIsActive });
          }
        }
      );
    } else {
      console.log("There is no Record of this event");
      return res.status(404).send("There is no Record of this event");
    }
  } else {
    console.log("Status is not Boolean");
    return res.status(400).send("Status not Boolean");
  }
});

router.delete("/:id", isIdValid, async (req, res) => {
  let id = req.params.objectId;

  if (await deleteEvent(id)) {
    console.log("deleted event with id " + id);
    res.status(200).json({ id: id });
  } else {
    console.log("Event does not exist" + id);
    res.status(404).send("Event does not exist");
  }
});

export default router;
