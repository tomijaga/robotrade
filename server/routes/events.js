import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from "body-parser";
import {
  nextId,
  readCustomerFile,
  writeToCustomerFile,
} from "../CustomFunctions/ReadWrite.js";
import { auth } from "../CustomFunctions/Authorize.js";
import {
  createEvent,
  getEvent,
  deleteEvent,
} from "../CustomFunctions/eventFunctions.js";
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
  readCustomerFile(req.session.username, (userData) => {
    console.log("getting Events");
    console.log(userData.events.events);
    res.status(200).json(userData.events.events);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    readCustomerFile(req.session.username, (userData) => {
      console.log("getting Event", id);
      const event = getEvent(userData, id);
      if (event) {
        console.log(event);
        res.status(200).json(event);
      } else {
        console.log("There is no Record of this event");
        return res.status(404).send("There is no Record of this event");
      }
    });
  }
});

router.post("/", (req, res) => {
  let username = req.session.username;
  readCustomerFile(username, (userData) => {
    const newAlert = createEvent(userData, req.body);
    if (newAlert) {
      writeToCustomerFile(username, userData, () => {
        console.log("Creating Event ...", newAlert);
        res.json(newAlert);
      });
    } else {
      console.log("Insufficient Info: Alert could not be created");
      res.status(400).send("Insufficient Info: Alert could not be created");
    }
  });
});

router.put("/:id", async (req, res) => {
  let username = req.session.username;
  const id = req.params.id;
  let eventIsActive = req.body.eventIsActive;

  if (typeof eventIsActive === "boolean") {
    readCustomerFile(username, (userData) => {
      const event = getEvent(userData, id);
      if (event) {
        if (event.active !== eventIsActive) {
          event.active = eventIsActive;
        } else {
          console.log(
            "Event status is already " +
              (eventIsActive ? "" : "not") +
              " Active"
          );
          return res
            .status(409)
            .send(
              "Event status is already " +
                (eventIsActive ? "" : "not") +
                " Active"
            );
        }
        writeToCustomerFile(username, userData, () => {
          console.log(event);
          res.json({ id: id });
        });
      } else {
        console.log("There is no Record of this event");
        return res.status(404).send("There is no Record of this event");
      }
    });
  } else {
    console.log("Status is not specified Correctly");
    return res.status(400).send("Status not specified Correctly");
  }
});

router.delete("/:id", (req, res) => {
  let username = req.session.username;
  let id = req.params.id;

  if (id) {
    readCustomerFile(username, (userData) => {
      if (getEvent(userData, id)) {
        deleteEvent(userData, id);
        writeToCustomerFile(username, userData, () => {
          console.log("Deleted Event id", id);
          res.status(200).json({ id: id });
        });
      } else {
        console.log("Event is not in our Records");
        res.status(400).send("Event is not in our Records");
      }
    });
  } else {
    console.log("id is not specified");
    res.status(400).send("id is not specified");
  }
});

export default router;
