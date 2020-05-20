const express = require('express');
const bodyParser = require('body-parser');
var promoRouter = express.Router();
const mongoose = require('mongoose');

const Promotions = require("../models/promotions")

promoRouter.use(bodyParser.json())

promoRouter.route("/")
    .get((req, res, next) => {
        Promotions.find({})
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/plain")
                res.json(promos)
            }, (err) => next(err))
    })
    .post((req, res, next) => {
        Promotions.create(req.body)
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader("ContentType", "application/json")
                res.json(promo)
            }, (err) => next(err))
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("put operation not supported on" + req.baseUrl + req.url)
    })

    .delete((req, res, err) => {
        Promotions.remove({})
            .then((result) => {
                console.log("promotions removed");
                res.statusCode = 200;
                res.setHeader("ContentType", "application/json")
                res.json(result)
            }, (err) => next(err))
    });



promoRouter.route("/:promoId")
    .get((req, res) => {
        Promotions.findById(req.params.promoId)
        .then((promo)=>{
            res.statusCode = 200;
            res.setHeader("ContentType", "application/json");
            res.json(promo)
        }, (err) => next(err))
    })
    .post((req, res, next)=>{
        res.statusCode = 403;
        res.end("POST method not supported on "+req.baseUrl + req.url)
    })

    .put((req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set : req.body
        }, {
            new: true
        })
        .then((promo) =>{
            res.statusCode = 200;
            res.setHeader("ContentType", "application/json")
            res.json(promo)
        }, (err) => next(err))
    })
    
    .delete((req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promoId)
        .then((resp) =>{
            res.statusCode = 200;
            res.setHeader("ContentType", "application/json")
            res.json(resp)
        }, (err) => next(err))
    })


module.exports = promoRouter
