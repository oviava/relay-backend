module.exports = (sequelize, DataTypes) => {
  const Presentation = sequelize.define('Presentation', {
    title: { type: DataTypes.STRING(128), allowNull: false }, // eslint-disable-line
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Presentation.Speaker = Presentation.belongsTo(models.Speaker, {
          as: 'speaker',
          foreignKey: 'speakerId',
          onDelete: 'CASCADE',
          hooks: true,
        });
      },
    },
    timestamps: false,
  });

  return Presentation;
};
