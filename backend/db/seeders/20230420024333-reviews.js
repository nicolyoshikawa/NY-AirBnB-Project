'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 2,
        review: "this is a great stay",
        stars: 1,
      },
      {
        userId: 1,
        spotId: 3,
        review: "this is a great stay",
        stars: 1,
      },
      {
        userId: 2,
        spotId: 1,
        review: "this is an okay stay",
        stars: 2,
      },
      {
        userId: 2,
        spotId: 3,
        review: "this is an okay stay",
        stars: 2,
      },
      {
        userId: 3,
        spotId: 1,
        review: "I enjoyed this stay",
        stars: 3,
      },
      {
        userId: 3,
        spotId: 2,
        review: "I enjoyed this stay",
        stars: 3,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [ 1, 2, 3,4,5,6 ] }
    }, {});
  }
};
