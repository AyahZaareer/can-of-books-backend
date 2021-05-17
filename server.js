'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://127.0.0.1:27017/book', { useNewUrlParser: true, useUnifiedTopology: true });


const bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String
});

const userSchema = new mongoose.Schema({
    email: String,
    book: [bookSchema]

});

const mybookModel = mongoose.model('mybookModel', bookSchema);
console.log(mybookModel);
const userModel = mongoose.model('userModel', userSchema);

seedUserCollection();

function seedUserCollection() {
    const ayah = new userModel({
        email: 'ayahzaareer5@gmail.com',
        book: [
            {
                name: 'Broken Glass',
                description: 'by Alain Mabanckou (2005)',
                status: 'it is good book'
            },
            {
                name: 'The Girl With the Dragon Tattoo',
                description: 'by Stieg Larsson (2005)',
                status: 'it is good book'
            }
        ]
    });
    const dina = new userModel({
        email: 'dina.faur@yahoo.com',
        book: [
            {
                name: 'Harry Potter',
                description: 'by JK Rowling (2000)',
                status: 'it is good book'
            },
            {
                name: 'A Little Life',
                description: 'by Hanya Yanagihara (2015)',
                status: 'it is good book'
            }
        ]
    });

    ayah.save();
    dina.save();
}



app.get('/book', getBookByUser);





function getBookByUser(req, res) {
    const { email } = req.query;
    console.log(email);
    userModel.find({ email: email }, function (err, ownerData) {
        if (err) res.send('didnt work');
        console.log(ownerData[15].book)
        res.send(ownerData[15].book);
    });
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));