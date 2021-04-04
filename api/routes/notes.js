const pick = require('lodash.pick');
const express = require('express');
const router = express.Router();

const db = require('./../db');
const authenticate = require('../middleware/authenticate');

const ALLOWED_PROPS = [
  'firstName',
  'lastName',
  'middleName',
  'phone',
  'address',
];

router.post('/', authenticate, (req, res) => {
  const { ...note } = pick(req.body, [
    'inn',
    'firstName',
    'lastName',
    'middleName',
    'address',
    'phone',
  ]);

  db.models.note
    .create(note)
    .then((note) => {
      const filtered = pick(note, ALLOWED_PROPS);
      res.send(filtered);
    })
    .catch((e) => res.status(400).send(e));
});

router.get('/', authenticate, async (req, res) => {
  try {
    const notes = await db.models.note.findAll({});
    const filteredNotes = notes.map((n) => {
      return pick(n.dataValues, ALLOWED_PROPS);
    });

    res.send({ notes: filteredNotes });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
