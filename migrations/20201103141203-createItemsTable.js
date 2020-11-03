'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'Items',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        condition: {
          type: Sequelize.STRING,
          allowNull: false
        },
        price: {
          type: Sequelize.DOUBLE,
          allowNull: false
        },
        categoryId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        cityId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          default: Sequelize.NOW
        },
        updatedAt: {
          type: Sequelize.DATE,
          default: Sequelize.NOW
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(
      'Items'
    )
  }
};
