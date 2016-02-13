module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    name: { type: DataTypes.STRING(64), allowNull: false }, // eslint-disable-line
    location: { type: DataTypes.STRING(128), allowNull: false }, // eslint-disable-line
  }, {
    classMethods: {
      associate: (models) => {
        Room.Presentations = Room.hasMany(models.Presentation, {
          as: 'presentations',
          foreignKey: 'roomId',
        });
      },
    },
    timestamps: false,
  });

  return Room;
};
