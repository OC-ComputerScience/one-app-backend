module.exports = (sequelize, Sequelize) => {
    const Field = sequelize.define("field", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      label: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      placeholderText: {
        type: Sequelize.STRING,
      },
      fieldSequence: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isRequired: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isEncrypted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      sorted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      mask: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      defaultField: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  
    return Field;
  };
  