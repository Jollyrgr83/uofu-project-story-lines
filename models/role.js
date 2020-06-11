module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define(
    "Role",
    {
      role: {
        type: DataTypes.ENUM,
        values: ["Owner", "Manager", "Employee"]
      }
    },
    {
      timestamps: false
    }
  );
  //console.log(Role.rawAttributes.role.values[0]);
  return Role;
};
