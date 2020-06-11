module.exports = function(sequelize, DataTypes) {
  const Status = sequelize.define(
    "Status",
    {
      states: {
        type: DataTypes.ENUM,
        values: ["Todo", "Blocked", "In Progess", "Completed"]
      }
    },
    {
      timestamps: false
    }
  );
  //console.log(Status.rawAttributes.states.values[0]);
  return Status;
};
