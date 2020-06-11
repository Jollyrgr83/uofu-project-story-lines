module.exports = function(sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.INTEGER
    },
    story: {
      type: DataTypes.INTEGER
    },
    //time spent to complete task in minutes
    //will be converted automatically after user input
    time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  return Task;
};
