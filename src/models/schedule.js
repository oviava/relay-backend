module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
  }, {
    classMethods: {
      associate: (models) => {
        Schedule.Presentations = Schedule.hasMany(models.Presentation, {
          as: 'presentations',
          foreignKey: 'scheduleId',
        });
      },
    },
    timestamps: false,
  });

  return Schedule;
};
