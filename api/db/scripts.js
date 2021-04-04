const createAdmin = async (db) => {
  const { ADMIN_NAME, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_PASSWORD) {
    console.log(
      '"ADMIN_NAME" or "ADMIN_PASSWORD" in ".env" file is not provided'
    );
    process.exit(1);
  }

  try {
    await db.sequelize.sync();

    const admin = await db.models.admin.create({
      name: ADMIN_NAME,
      password: ADMIN_PASSWORD,
    });
    console.log(`The admin with name "${admin.name}" is created succesfully.`);
  } catch (e) {
    console.log('Error: cannot create an admin', e);
    process.exit(1);
  }
};

const isAdminExists = async (db) => {
  const { ADMIN_NAME } = process.env;

  try {
    await db.sequelize.sync();

    const [admin] = await db.models.admin.findAll({
      where: {
        name: ADMIN_NAME,
      },
    });

    return !!admin;
  } catch (e) {
    console.log('Error: cannot check if an admin is exists - ', e);
    process.exit(1);
  }
};

module.exports = {
  createAdmin,
  isAdminExists,
};
