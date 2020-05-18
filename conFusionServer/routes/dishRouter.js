const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const Dishes = require("../models/dishes");

var dishRouter = express.Router();

dishRouter.use(bodyParser.json())

dishRouter.route("/")
    .get((req, res, next) => {
        Dishes.find({})
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader("ContentType", "applocation/json")
                res.json(dishes)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        Dishes.create(req.body)
            .then((dish) => {
                console.log("dish created", dish);
                res.statusCode = 200
                res.setHeader("ContentType", "application/json")
                res.json(dish)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put((req, res) => {
        res.statusCode = 403
        res.end("PUT operation not supported on " + req.baseUrl);
    })
    .delete((req, res, next) => {
        Dishes.remove({}).then((resp) => {
            console.log("dishes removed");
            res.statusCode = 200
            res.setHeader("ContentType", "application/json")
            res.json(resp)
        }, (err) => {
            next(err)
        }).catch((err) => {
            next(err)
        })
    });


// dishId endpoint

dishRouter.route("/:id")
    .get((req, res, next) => {
        Dishes.findById(req.params.id).then((dishes) => {
            res.statusCode = 200;
            res.setHeader("ContentType", "applocation/json")
            res.json(dishes)
        }, (err) => {
            next(err)
        }).catch((err) => {
            next(err)
        })
    })
    .post((req, res, next) => {
        res.statusCode = 403
        res.end(`POST operation not supported on /dishes${req.url}`)
    })
    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true }).then((dish) => {
            res.statusCode = 200;
            res.setHeader("ContentType", "applocation/json")
            res.json(dish)
        }, (err) => {
            next(err)
        }).catch((err) => {
            next(err)
        })
    })
    .delete((req, res, next) => {
        Dishes.findByIdAndRemove(req.params.id)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader("ContentType", "application/json");
                res.json(resp)
            }, (err) => {
                next(err)
            }).catch((err) => next(err))
    })


// comments

dishRouter.route("/:id/comments")
    .get((req, res, next) => {
        Dishes.findById(req.params.id)
            .then((dish) => {
                if (dish != null) {
                    res.statusCode = 200;
                    res.setHeader("ContentType", "applocation/json");
                    res.json(dish.comments);
                } else {
                    err = new Error("dish " + req.params.id + " not found");
                    err.status = 404
                    return next(err)
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        Dishes.findById(req.params.id)
            .then((dish) => {
                if (dish != null) {
                    dish.comments.push(req.body)
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader("ContentType", "applocation/json");
                            res.json(dish)
                        }, (err) => next(err));
                } else {
                    err = new Error("dish " + req.params.id + " not found");
                    err.status = 404
                    return next(err)
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put((req, res) => {
        res.statusCode = 403
        res.end("PUT operation not supported on " + req.baseUrl + req.url);
    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.id)
            .then((dish) => {
                if (dish != null) {
                    for (let i = (dish.comments.length - 1); i >= 0; i--) {
                        dish.comments.id(dish.comments[i]._id).remove()
                    }
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader("ContentType", "applocation/json");
                            res.json(dish)
                        }, (err) => next(err));
                } else {
                    err = new Error("dish " + req.params.id + " not found");
                    err.status = 404
                    return next(err)
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    });


// dishId endpoint

dishRouter.route("/:id/comments/:commentId")
    .get((req, res, next) => {
        Dishes.findById(req.params.id)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    res.statusCode = 200;
                    res.setHeader("ContentType", "applocation/json");
                    res.json(dish.comments.id(req.params.commentId));
                } else if (dish == null) {
                    err = new Error("dish " + req.params.id + " not found");
                    err.status = 404
                    return next(err)
                }
                else {
                    err = new Error("comment " + req.params.commentId + " not found");
                    err.status = 404
                    return next(err)
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.statusCode = 403
        res.end(`POST operation not supported on /dishes${req.url}${req.params.commentId}`)
    })
    .put((req, res, next) => {
        Dishes.findById(req.params.id)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    if (req.body.rating) {
                        dish.comments.id(req.params.commentId).rating = req.body.rating
                    }
                    if (req.body.comment) {
                        dish.comments.id(req.params.commentId).comment = req.body.comment
                    }
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader("ContentType", "applocation/json");
                            res.json(dish)
                        }, (err) => next(err));
                } else if (dish == null) {
                    err = new Error("dish " + req.params.id + " not found");
                    err.status = 404
                    return next(err)
                }
                else {
                    err = new Error("comment " + req.params.commentId + " not found");
                    err.status = 404
                    return next(err)
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.id)
            .then((dish) => {
                if (dish != null) {
                    dish.comments.id(req.params.commentId).remove()
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader("ContentType", "applocation/json");
                            res.json(dish)
                        }, (err) => next(err));
                } else if (dish == null) {
                    err = new Error("dish " + req.params.id + " not found");
                    err.status = 404
                    return next(err)
                }
                else {
                    err = new Error("comment " + req.params.commentId + " not found");
                    err.status = 404
                    return next(err)
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })


module.exports = dishRouter