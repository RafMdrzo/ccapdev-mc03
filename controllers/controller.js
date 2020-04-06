const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: async function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `home.hbs` with all contacts
            current stored in the database.
    */
    getIndex: async function(req, res) {
        // your code here
        db.findMany(User, {}, 'name number', (result)=>{
            res.render('home', {cards: result});
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckNumber`. This function checks if a
            specific number is stored in the database. If the number is
            stored in the database, it returns an object containing the
            number, otherwise, it returns an empty string.
    */
    getCheckNumber: async function(req, res) {
        // your code here
        var reqNum = req.query.number;
        db.findOne(User, {number: reqNum}, 'number', (result)=>{
            res.send(result);
        });

    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the contact sent
            by the client to the database, then appends the new contact to the
            list of contacts in `home.hbs`.
    */
    getAdd: async function(req, res) {
        // your code here
        var nameReq = req.query.name;
        var numReq = req.query.number;
        var resulter = [];

        db.insertOne(User, {name: nameReq, number: numReq}, ()=>{
            db.findMany(User, {}, 'name number', (result)=>{
                for(i = 0; i < result.length; i++){
                    var userMirror = {
                        name: result[i].name,
                        number: result[i].number
                    }
                    resulter.push(userMirror);
                }
                res.render('home', {cards: resulter});

            });
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the contact
            from the database, then removes the contact to the list of
            contacts in `home.hbs`.
    */
    getDelete: async function (req, res) {
        // your code here
        var delReq = req.query.number;
        console.log(delReq);

        db.deleteOne(User, {number: delReq}, (result)=>{
            res.send(result);
        });
    }

}

module.exports = controller;
