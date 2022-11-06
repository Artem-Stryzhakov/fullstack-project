import express from 'express';
import mongoose from 'mongoose'
import {registerValidation, loginValidation, postCreateValidation} from './validations.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import Post from "./models/Post.js";

mongoose.connect('mongodb+srv://artem:WebDevelop@fullstackproject.gx3iiu1.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB is not ok\n", err))

const app = express();

app.use(express.json())

app.get('/', function (req, res) {
    res.send("Hello world!")
})

// ===== LOGIN =====
app.post('/auth/login', loginValidation, UserController.login)

// ===== REGISTER =====
app.post('/auth/register', registerValidation, UserController.register)

// ===== GET ME =====
app.get('/auth/me', checkAuth, UserController.getMe)

//app.get('/posts', checkAuth, PostController.getAll)
//app.get('/posts/:id', checkAuth, PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
//app.delete('/posts', checkAuth, PostController.remove)
//app.patch('/posts', checkAuth, PostController.update)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log("Server OK");
})
