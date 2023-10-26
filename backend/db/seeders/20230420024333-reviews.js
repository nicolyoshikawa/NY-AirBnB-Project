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
        spotId: 6,
        review: "I enjoyed this stay",
        stars: 4,
      },
      {
        userId: 1,
        spotId: 7,
        review: "this was a great say!",
        stars: 5,
      },
      {
        userId: 1,
        spotId: 8,
        review: "this house was not clean",
        stars: 1,
      },
      {
        userId: 1,
        spotId: 11,
        review: "this house was not clean",
        stars: 1,
      },
      {
        userId: 1,
        spotId: 12,
        review: "this house was clean",
        stars: 4,
      },
      {
        userId: 1,
        spotId: 13,
        review: "this is a great stay",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 1,
        review: "I did not like this house",
        stars: 1,
      },
      {
        userId: 2,
        spotId: 2,
        review: "this is a great stay",
        stars: 5,
      },
      {
        userId: 2,
        spotId: 3,
        review: "I enjoyed this stay",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 11,
        review: "this house was not clean",
        stars: 1,
      },
      {
        userId: 2,
        spotId: 12,
        review: "a little dirty. but I still enjoyed staying here",
        stars: 3,
      },
      {
        userId: 2,
        spotId: 13,
        review: "this was fun to stay at",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 14,
        review: "i love the beach! this was nice to stay close to the beach.",
        stars: 4,
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
        review: "This was an okay place to stay",
        stars: 3,
      },
      {
        userId: 3,
        spotId: 3,
        review: "This treehouse was so fun!",
        stars: 5,
      },
      {
        userId: 3,
        spotId: 6,
        review: "I did not like staying here",
        stars: 2,
      },
      {
        userId: 3,
        spotId: 7,
        review: "I would stay here again",
        stars: 4,
      },
      {
        userId: 3,
        spotId: 8,
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
