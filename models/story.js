module.exports = function(sequelize, DataTypes) {
  const Story = sequelize.define("Story", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    project: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assignee: {
      type: DataTypes.INTEGER
    },
    reporter: {
      type: DataTypes.INTEGER
    },
    estimate: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Story;
};
