import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
import { validationResult } from 'express-validator';


import { registerValidation } from './validations/auth.js';

mongoose.connect(
    'mongodb+srv://admin:wwwwww@cluster0.t9rcjxm.mongodb.net/?retryWrites=true&w=majority'
).then(() => console.log("DB ok"))
    .catch((err) => console.log("DB is not ok", err))

const app = express();

app.use(express.json())

app.get('/', function (req, res) {
    res.send(`
    <table id="mainTable">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
        </tr>
        <tr>
            <td>Artem</td>
            <td>strizakov00@gmail.com</td>
            <td>18</td>
        </tr>
    </table>
    <style>   
        #mainTable {
            width: 50%;
            background-color: darkkhaki;
            text-align: center;
            background-color: white;
            border-collapse: collapse;
            border: 1px solid black;
            margin: auto;
        }

        th {
            background-color: black;
            color: white;
        }

        td {
            border: 1px solid black;
        }
</style>
    `)
})

app.post('/auth/register', registerValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    res.json({
        success: true,
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log("Server OK");
})
