const express = require("express");
const router = express.Router();
const Note = require("./notes.model");

router.get("/notes", (req, res) => {
  Note.find()
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "Something went wrong while fetching data",
      });
    });
});

router.get("/notes/:id", (req, res) => {
  Note.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "Note not found with id " + req.params.id });
      } else {
        return res.json(user);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "Error getting note with id " + req.params.id,
      });
    });
});

router.post("/notes", (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).json({
      message: "Request is empty",
    });
  }

  const note = new Note({
    title: req.body.title,
    text: req.body.text,
  });

  note
    .save()
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "Something went wrong while creating new note.",
      });
    });
});

router.delete("/notes/:id", (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then((Note) => {
      if (!Note) {
        return res
          .status(404)
          .json({ message: "Note not found with id " + req.params.id });
      } else {
        return res.json({ message: "Note deleted successfully" });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Error getting note with id " + req.params.id,
      });
    });
});

router.put("/notes/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Request is empty",
    });
  }

  Note.findByIdAndUpdate(req.params.id, { title: req.body.title, text: req.body.text }, { new: true })
    .then((Note) => {
      if (!Note) {
        return res
          .status(404)
          .json({ message: "Note not found with id " + req.params.id });
      } else {
        return res.json(Note);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Error getting note with id " + req.params.id,
      });
    });
});
//full update

module.exports = router;
