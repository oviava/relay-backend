module.exports = (sequelize, DataTypes) => {
  let Speaker = sequelize.define('Speaker', { // eslint-disable-line
    name: { type: DataTypes.STRING(128), allowNull: false }, // eslint-disable-line
    description: DataTypes.STRING,
    position: DataTypes.STRING(128), // eslint-disable-line
    company: DataTypes.STRING(128), // eslint-disable-line
  }, {
    classMethods: {
      associate: (models) => {
        Speaker.Presentations = Speaker.hasMany(models.Presentation, {
          as: 'presentations',
          foreignKey: 'speakerId',
          onDelete: 'CASCADE',
          hooks: true,
        });
      },
    },
    timestamps: false,
  });

  return Speaker;
};
