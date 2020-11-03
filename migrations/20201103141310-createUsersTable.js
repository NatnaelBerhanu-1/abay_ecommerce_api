'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'Users',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        phoneNumber: {
          type: Sequelize.STRING,
        },
        profilePicture: {
          type: Sequelize.STRING,
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
    queryInterface.dropTable('Users');
  }
};
