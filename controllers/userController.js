const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("./../models/user");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to user controller");
});

app.post("/add", (req, res) => {
  let data = req.body;

  let hashedPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));

  let user = new User({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,
    gender: data.gender,
    birthday: data.birthday,
    level: data.level,
    since: data.since,
    department: data.department,
  });

  user
    .save()
    .then(() => {
      res.status(200).send({ message: "Member added" });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/all", (req, res) => {
  User.find({ role: "member" })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/one/:id", (req, res) => {
  let id = req.params.id;

  User.findOne({ _id: id })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Member not found" });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.patch("/update_account_state", (req, res) => {
  let id = req.body.id;

  User.findOne({ _id: id })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Member not found" });
      } else {
        user.accountState = !user.accountState;
        user.save();
        res.status(200).send({ message: "Account state updated" });
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.patch("/update_info/:id", (req, res) => {
  let data = req.body;
  let id = req.params.id;

  User.findOneAndUpdate({ _id: id }, data, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Member not found" });
      } else {
        res.status(200).send({ message: "Info updated" });
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.delete("/delete/:id", (req, res) => {
  let id = req.params.id;

  User.findOneAndDelete({ _id: id })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Member not found" });
      } else {
        res.status(200).send({ message: "Member Deleted" });
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.post("/login", (req, res) => {
  let data = req.body;

  User.findOne({ email: data.email })
    .then((user) => {

      if (!user) {
        res.status(404).send({ message: "Email / Password incorrect(s)" });
      } else {

        let compare = bcrypt.compareSync(data.password, user.password);

        if (!compare) {
          res.status(404).send({ message: "Email / Password incorrect(s)" });
        } else {

          if (!user.accountState) {
            res.status(400).send({ message: "Account Disabled" });
          } else {
            let obj = {
              role: data.role,
              accountState: data.accountState,
              _id: data._id,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              phone: data.phone,
              gender: data.gender,
              birthday: data.birthday,
              level: data.level,
              since: data.since,
              department: data.department,
            }
            let token = jwt.sign(obj, "SEKRITOU");

            res.status(200).send({ token });
          }
        }
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

module.exports = app;
