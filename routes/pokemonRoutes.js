const express = require('express');
const router = express.Router();
const { catchPokemon, releasePokemon, renamePokemon } = require('../controllers/pokemonController');

router.post('/catch', catchPokemon);
router.delete('/release/:name', releasePokemon);
router.put('/rename', renamePokemon);

module.exports = router;
