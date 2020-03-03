module.exports = (sequelize, DataType) => {
  const activity = sequelize.define("activity", {
    type: {
      type: DataType.STRING(100)
    },
    amount: {
      type: DataType.BIGINT(20)
    },
    remarks: {
      type: DataType.STRING(200)
    },
    date: {
      type: DataType.STRING(255)
    }
  });
  activity.associate = models => {
    activity.belongsTo(models.user, {
      foreignKey: "user_id"
    });
  };
  return activity;
};
