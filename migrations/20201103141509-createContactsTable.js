'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'Contacts',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        name: {
          type: Sequelize.STRING
        },
        imageUrl: {
          type: Sequelize.STRING
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
    queryInterface.dropTable("Contacts");
  }
};
