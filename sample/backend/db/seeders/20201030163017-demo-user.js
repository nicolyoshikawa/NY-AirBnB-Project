'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'User',
        // username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'john.smith@gmail.com',
        firstName: 'John',
        lastName: 'Smith',
        // username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'john.smith4@gmail.com',
        firstName: 'John',
        lastName: 'Smith',
        // username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      email: { [Op.in]: [
        'demo@user.io', 
        'john.smith@gmail.com', 
        'john.smith4@gmail.com'
      ] }
    }, {});
  }
};