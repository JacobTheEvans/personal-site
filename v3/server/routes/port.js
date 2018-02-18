let Router = require("express").Router;

//import port model
let Port = require("../models/port.js");

//import authorization
let expressJwt = require("express-jwt");
let settings = require("../config/settings.js");

const portRouter = Router();

portRouter.get("/", (req, res) => {
  Port.find({}, (err, data) => {
    if(err) {
      res.status(500).send(err);
    } else if(data.length > 0) {
      res.status(200).send({"message": "Success data from /port", data});
    } else {
      res.status(200).send({"message": "No data found on endpoint /port"});
    }
  })
});

portRouter.use(expressJwt({
  secret: settings.secret
}));

portRouter.post("/", (req, res) => {
  let newPort = new Port(req.body);
  newPort.save((err, data) => {
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({"message": "Success item was created", data});
    }
  });
});

portRouter.put("/:id", (req, res) => {
  Port.findOne({_id: req.params.id}, (err, data) => {
    if(err) {
      res.status(500).send(err);
    } else if(data !== undefined) {
      for(let key in req.body) {
        data[key] = req.body[key];
      }
      data.save((err, data) => {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(200).send({"message": `Success item with ID: ${req.params.id} was updated`, data});
        }
      });
    } else {
      res.status(400).send({"message": `No item with ID: ${req.params.id} was found`});
    }
  });
});

portRouter.delete("/:id", (req, res) => {
  Port.findOne({_id: req.params.id}, (err, data) => {
    if(err) {
      res.status(500).send(err);
    } else if(data !== undefined) {
      data.remove((err, data) => {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(200).send({"message": `Success item with ID: ${req.params.id} was deleted`, data});
        }
      });
    } else {
      res.status(400).send({"message": `No item with ID: ${req.params.id} was found`});
    }
  });
});

module.exports = portRouter;
