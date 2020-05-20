const express = require('express');
const bodyParser = require('body-parser');
var leadersRouter = express.Router();
const mongoose = require("mongoose")

const Leaders = require("../models/leaders")

leadersRouter.use(bodyParser.json())

leadersRouter.route("/")
    .get((req, res, next) => {
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader("ContentType", "application/json")
                res.json(leaders)
            }, (err) => next(err))
    })
    .post((req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader("ContentType", "application/json")
                res.json(leader)
            }, (err) => next(err))
    })

    .put((req, res) => {
        res.statusCode = 403;
        res.end("PUT method not supported on " + req.baseUrl + req.url)
    })
    .delete((req, res, next) => {
        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader("ContentType", "application/json")
                res.json(resp)
            }, (err) => next(err))
    });

leadersRouter.route("/:leaderId")
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader("ContentType", "application/json")
                res.json(leader)
            }, (err) => next(err))
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST method not supported on " + req.baseUrl + req.url)
    })

    .put((req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader("CntentType", "application/json")
                res.json(leader)
            }, (err) => next(err))
    })

    .delete((req, res, err) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader("ContentType", "application/json")
                res.json(resp)
            }, (err) => next(err))
    })


module.exports = leadersRouter
