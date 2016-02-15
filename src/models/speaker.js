module.exports = (sequelize, DataTypes) => {
  const Speaker = sequelize.define('Speaker', { // eslint-disable-line
    name: { type: DataTypes.STRING(128), allowNull: false }, // eslint-disable-line
    description: DataTypes.TEXT,
    position: DataTypes.STRING(128), // eslint-disable-line
    company: DataTypes.STRING(128), // eslint-disable-line
    imgUrl: DataTypes.STRING(128), // eslint-disable-line
  }, {
    classMethods: {
      associate: (models) => {
        Speaker.Presentations = Speaker.hasMany(models.Presentation, {
          as: 'presentations',
          foreignKey: 'speakerId',
        });
      },
    },
    timestamps: false,
  });

  return Speaker;
};
