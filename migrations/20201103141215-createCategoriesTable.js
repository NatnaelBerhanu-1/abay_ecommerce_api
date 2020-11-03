'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'Categories',
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
        imageUrl: {
          type: Sequelize.TEXT,
          allowNull: false,
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
    queryInterface.dropTable('Categories');
  }
};
