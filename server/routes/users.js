const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});//get all users

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).send('No user found')
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })
});//get single user

router.post('/', (req, res) => {
    const newUser = new User(req.body)
    newUser.save()
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            res.status(500).send(err)
        })
});// create a user

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body)
        .then(item => {
            res.status(204).json(item)
        })
});// update a user

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(item => {
            res.status(200).json(item)
        })
});// delete a user

module.exports = router;