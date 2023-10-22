'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        url: "",
        spotId: 1,
        preview: true
      },
      {
        url: "",
        spotId: 2,
        preview: true
      },
      {
        url: "",
        spotId: 3,
        preview: true
      },
      {
        url: "",
        spotId: 4,
        preview: true
      },
      {
        url: "",
        spotId: 5,
        preview: true
      },
      {
        url: "",
        spotId: 6,
        preview: true
      },
      {
        url: "",
        spotId: 7,
        preview: true
      },
      {
        url: "",
        spotId: 8,
        preview: true
      },
      {
        url: "",
        spotId: 9,
        preview: true
      },
      {
        url: "",
        spotId: 10,
        preview: true
      },
      {
        url: "",
        spotId: 11,
        preview: true
      },
      {
        url: "",
        spotId: 12,
        preview: true
      },
      {
        url: "",
        spotId: 13,
        preview: true
      },
      {
        url: "",
        spotId: 14,
        preview: true
      },
      {
        url: "",
        spotId: 15,
        preview: true
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [ 1, 2, 3 ] }
    }, {});
  }
};
