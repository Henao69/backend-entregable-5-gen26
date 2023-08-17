const express = require('express');
const routerMovie = require('./movie.router');
const routerActor = require('./actor.router');
const routerGenre = require('./genre.router');
const routerDirector = require('./director.router');
const router = express.Router();


router.use('/movies', routerMovie)
router.use('/actors', routerActor)
router.use('/genres', routerGenre)
router.use('/directors', routerDirector)


module.exports = router;