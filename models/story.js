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

  Story.associate = function(models) {
    Story.belongsTo(models.Project, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Story;
};
