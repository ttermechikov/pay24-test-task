const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'admin',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokens: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: (admin) => {
          admin.password =
            admin.password && admin.password != ''
              ? bcrypt.hashSync(admin.password, 10)
              : '';
        },
      },
    }
  );

  Admin.findByCredentials = async function (login, password) {
    const Admin = this;

    try {
      const admin = await Admin.findOne({
        where: {
          name: login,
        },
      });

      if (admin) {
        const isValidPassword = await bcrypt.compare(
          password,
          admin.dataValues.password
        );

        return isValidPassword && admin;
      }

      return null;
    } catch (e) {
      console.log('Error while finding by credentials - ', e);
    }
  };

  Admin.prototype.generateAuthToken = function () {
    const admin = this;
    const access = 'auth';
    const token = jwt
      .sign(
        {
          id: admin.dataValues.id,
          access,
        },
        process.env.JWT_SECRET
      )
      .toString();

    const tokensInJson = admin.dataValues.tokens;
    let tokens = JSON.parse(tokensInJson);

    if (!tokens) {
      tokens = [];
    }

    if (!tokens.find((t) => t.token === token)) {
      tokens.push({ token, access });
    }

    admin.tokens = JSON.stringify(tokens);

    return admin.save().then(() => token);
  };

  Admin.prototype.removeToken = function (token) {
    const admin = this;

    if (admin.dataValues.tokens) {
      const tokensInJson = admin.dataValues.tokens;
      const tokens = JSON.parse(tokensInJson).filter((t) => t.token !== token);

      admin.tokens = JSON.stringify(tokens);

      return admin.save();
    }

    return Promise.resolve();
  };

  Admin.findByToken = function (token) {
    const Admin = this;
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return Promise.reject();
    }

    return Admin.findOne({ id: decoded.id, 'tokens.token': token });
  };

  return Admin;
};
