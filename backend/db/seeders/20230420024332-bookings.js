'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        startDate: "2021-11-19",
        endDate: "2021-11-19",
      },
      {
        userId: 2,
        spotId: 2,
        startDate: "2021-11-19",
        endDate: "2021-11-19",
      },
      {
        userId: 3,
        spotId: 3,
        startDate: "2021-11-19",
        endDate: "2021-11-19",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [ 1, 2, 3 ] }
    }, {});
  }
};
