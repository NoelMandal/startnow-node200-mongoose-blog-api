const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");

router.get("/", (req, res) => {
  Blog
    .find()
    .then(blogs => {
        res.status(200).json(blogs);
  });
}); // get all blogs

router.get("/featured", (req, res) => {
  Blog
    .where({ feartured: true})
    .then(featuredBlogs => {
        res.status(200).json(featuredBlogs)
    });
}); // get featured blogs

router.get("/:id", (req, res) => {
  Blog
    .findById(req.params.id)
    .then(blog => {
        if(blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).send('No blog found')
        }
  })
    .catch(error => {
      res.status(500).send(error)
  })
}); // get single blog

router.post("/", (req, res) => {
    let dbUser = null;
    User
        .findById(req.body.authorId)
        .then(user => {
            dbUser = user;
            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();
        })
        .then(blog => {
            dbUser.blogs.push(blog);
            dbUser.save().then(() => res.status(201).json(blog));
        })
}); // create a blog and associate to userId

router.put("/:id", (req, res) => {
  Blog
    .findByIdAndUpdate(req.params.id, req.body)
    .then(item => {
        res.status(204).json(item);
  });
}); // update a blog

router.delete("/:id", (req, res) => {
  Blog
    .findByIdAndRemove(req.params.id)
    .then(item => {
        res.status(200).json(item);
  });
}); // delete a blog

module.exports = router;
