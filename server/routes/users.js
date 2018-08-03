const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("sorry no user id");
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/", (req, res) => {
  var newUser = new User(req.body);
  newUser
    .save()
    .then(item => {
      res.status(201).json(item);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body).then(item => {
    res.status(204).json(item);
  });
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id).then(item => {
    res.status(200).json(item);
  });
});

module.exports = router;
