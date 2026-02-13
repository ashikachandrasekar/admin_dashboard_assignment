require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyparser.json());

const url = process.env.MONGO_URL; 

mongoose.connect(url).then(() => {
    console.log("db is on");
});

const userschema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    role: String,
    status: String
});

const userdb = mongoose.model('userdb', userschema);

app.post('/register', async (req, res) => {
    const check = await userdb.findOne({ username: req.body.name });
    if (check) {
        res.status(400).send({ msg: "user exists" });
    } else {
        const newuser = new userdb({
            username: req.body.name,
            password: req.body.pass,
            role: req.body.role,
            status: "offline"
        });
        await newuser.save();
        res.send({ msg: "done" });
    }
});

app.post('/login', async (req, res) => {
    const user = await userdb.findOne({ username: req.body.name, password: req.body.pass });
    if (user) {
        user.status = "online";
        await user.save();
        res.send({ msg: "ok", role: user.role, name: user.username });
    } else {
        res.status(401).send({ msg: "error" });
    }
});

app.post('/logout', async (req, res) => {
    const user = await userdb.findOne({ username: req.body.name });
    if (user) {
        user.status = "offline";
        await user.save();
        res.send({ msg: "out" });
    }
});

app.get('/users', async (req, res) => {
    const all = await userdb.find();
    res.send(all);
});

app.delete('/remove/:id', async (req, res) => {
    await userdb.findByIdAndDelete(req.params.id);
    res.send({ msg: "deleted" });
});

app.listen(5000, () => {
    console.log("running on 5000");
});