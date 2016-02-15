module.exports = (sequelize, DataTypes) => {
  const Presentation = sequelize.define('Presentation', {
    title: { type: DataTypes.STRING(128), allowNull: false }, // eslint-disable-line
    description: DataTypes.TEXT,
    language: { type: DataTypes.STRING(64)} // eslint-disable-line
  }, {
    classMethods: {
      associate: (models) => {
        Presentation.Speaker = Presentation.belongsTo(models.Speaker, {
          as: 'speaker',
          foreignKey: 'speakerId',
          onDelete: 'CASCADE',
          hooks: true,
        });
        Presentation.Schedule = Presentation.belongsTo(models.Schedule, {
          as: 'schedule',
          foreignKey: 'scheduleId',
          onDelete: 'CASCADE',
          hooks: true,
        });
        Presentation.Room = Presentation.belongsTo(models.Room, {
          as: 'room',
          foreignKey: 'roomId',
          onDelete: 'CASCADE',
          hooks: true,
        });
      },
    },
    timestamps: false,
  });

  return Presentation;
};
