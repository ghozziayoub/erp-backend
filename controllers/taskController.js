const express = require("express");

const Task = require("./../models/task");
const { User } = require("./../models/user");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to task controller");
});

app.post("/add", async (req, res) => {
  try {
    let data = req.body;
    let user = await User.findOne({ _id: data.member_id })

    let task = new Task({
      title: data.title,
      description: data.description,
      label: data.label,
      member_id: data.member_id,
      member: user,
    });

    let savedTask = await task.save()
    res.status(200).send({ message: "Task added" });

  } catch (e) {
    res.status(400).send(e);
  };
});

app.get("/all", async (req, res) => {
  Task.find().populate('user')
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/all/:member_id", (req, res) => {
  let id = req.params.member_id;

  Task.find({ member_id: id })
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/one/:id", (req, res) => {
  let id = req.params.id;

  Task.findOne({ _id: id })
    .then((task) => {
      if (!task) {
        res.status(404).send({ message: "Task not found" });
      } else {
        res.status(200).send(task);
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.patch("/update_state/:id", (req, res) => {
  let state = req.body.state;
  let id = req.params.id;

  Task.findOne({ _id: id })
    .then((task) => {
      if (!task) {
        res.status(404).send({ message: "Task not found" });
      } else {
        task.state = state;
        task.save();
        res.status(200).send({ message: "State updated" });
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.patch("/update_content/:id", (req, res) => {
  let data = req.body;
  let id = req.params.id;

  Task.findOneAndUpdate({ _id: id }, data, { new: true })
    .then((task) => {
      if (!task) {
        res.status(404).send({ message: "Task not found" });
      } else {
        res.status(200).send({ message: "Content updated" });
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.delete("/delete/:id", (req, res) => {
  let id = req.params.id;

  Task.findOneAndDelete({ _id: id })
    .then((task) => {
      if (!task) {
        res.status(404).send({ message: "Task not found" });
      } else {
        res.status(200).send({ message: "Task Deleted" });
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

module.exports = app;