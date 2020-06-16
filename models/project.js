module.exports = function(sequelize, DataTypes) {
  const Project = sequelize.define("Project", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    owner: {
      type: DataTypes.INTEGER
    }
  });

  Project.associate = function(models) {
    Project.hasMany(models.Story, {
      onDelete: "cascade"
    });
  };
  return Project;
};
