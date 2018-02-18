let Router = require("express").Router;

//import article model
let Article = require("../models/article.js");

//import authorization
let expressJwt = require("express-jwt");
let settings = require("../config/settings.js");

const articleRouter = Router();

articleRouter.get("/", (req, res) => {
  Article.find({}, (err, data) => {
    if(err) {
      res.status(500).send(err);
    } else if(data.length > 0) {
      res.status(200).send({"message": "Success data from /article", data});
    } else {
      res.status(200).send({"message": "No data found on endpoint /article"});
    }
  })
});

articleRouter.use(expressJwt({
  secret: settings.secret
}));

articleRouter.post("/", (req, res) => {
  let newarticle = new Article(req.body);
  newarticle.save((err, data) => {
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({"message": "Success item was created", data});
    }
  });
});

articleRouter.put("/:id", (req, res) => {
  Article.findOne({_id: req.params.id}, (err, data) => {
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

articleRouter.delete("/:id", (req, res) => {
  Article.findOne({_id: req.params.id}, (err, data) => {
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

module.exports = articleRouter;
