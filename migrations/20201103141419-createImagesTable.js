'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'Images',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        imageUrl: {
          type: Sequelize.STRING
        },
        itemId: {
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
    queryInterface.dropTable('Images');
  }
};
