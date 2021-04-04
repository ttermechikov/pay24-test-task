const pick = require('lodash.pick');
const express = require('express');
const router = express.Router();

const db = require('./../db');
const authenticate = require('./../middleware/authenticate');

router.post('/login', (req, res) => {
  const { login, password } = pick(req.body, ['login', 'password']);

  db.models.admin
    .findByCredentials(login, password)
    .then((admin) => {
      if (!admin) {
        return Promise.reject();
      }

      return admin
        .generateAuthToken()
        .then((token) => ({ token, admin }))
        .catch((e) => console.log('e', e));
    })
    .then(({ token, admin }) => {
      const filteredAdminProps = pick(admin.dataValues, ['id', 'name']);

      res.header('x-auth', token).send(filteredAdminProps);
    })
    .catch((e) => res.status(401).send());
});

router.get('/logout', authenticate, (req, res) => {
  const token = req.headers['x-auth'];

  req.admin
    .removeToken(req.token)
    .then(() => res.send({ user: req.user }))
    .catch((e) => res.status(400).send());
});

module.exports = router;
