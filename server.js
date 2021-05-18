'use strict';

require('dotenv').config();
// const getBookByUser = require('./modal/User');
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// -------------------------------------

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/book', { useNewUrlParser: true, useUnifiedTopology: true });

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


seedUserCollection();



function getBookByUser(req, res) {
    const { email } = req.query;
    console.log(email);
    userModel.find({ email: email }, function (err, ownerData) {
        if (err) res.send('didnt work');
        console.log(ownerData[16].book)
        res.send(ownerData[16].book);
    });
}


function createBook(req, res) {
    const { name, description, status, email } = req.body;
    userModel.find({ email: email }, (error, ownerData) => {
        ownerData[16].book.push({
            name: name,
            description: description,
            status: status
        })
        ownerData[16].save();
        res.send(ownerData[16].book);
    })
}


function deleteBook(req, res) {
    const del = Number(req.params.del);
    console.log(req.params);
    const { email } = req.query;
    userModel.find({ email: email }, (error, ownerData) => {
        const newArrayOfBook = ownerData[16].book.filter((element, indEl) => {
            return indEl !== index;
        });
        ownerData[16].book = newArrayOfBook;

        ownerData[16].save();
        res.send('book delete')
    });



}



//-----------------------


app.get('/book', getBookByUser);
app.post('/book', createBook);
app.delete('/book/:del', deleteBook);

app.listen(PORT, () => console.log(`listening on ${PORT}`));


