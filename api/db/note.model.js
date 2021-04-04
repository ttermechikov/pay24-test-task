const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    'note',
    {
      inn: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: (note) => {
          note.inn =
            note.inn && note.inn != '' ? bcrypt.hashSync(note.inn, 10) : '';
        },
      },
    }
  );

  return Note;
};
