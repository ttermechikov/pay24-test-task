const db = require('./../db');

module.exports = function (req, res, next) {
  const token = req.headers['x-auth'];

  db.models.admin
    .findByToken(token)
    .then((admin) => {
      if (!admin) {
        return Promise.reject();
      }

      req.admin = admin;
      req.token = token;
      next();
    })
    .catch((e) => res.status(401).send());
};
