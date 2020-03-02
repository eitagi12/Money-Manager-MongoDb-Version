module.exports = (sequelize, DataType) => {
  const user = sequelize.define("user", {
    username: {
      type: DataType.STRING(100)
    },
    password: {
      type: DataType.STRING(100)
    },
    firstname: {
      type: DataType.STRING(100)
    },
    lastname: {
      type: DataType.STRING(100)
    },
    phone_number: {
      type: DataType.STRING(10)
    },
    role: {
      type: DataType.ENUM("user", "admin")
    }
  });
  return user;
};
