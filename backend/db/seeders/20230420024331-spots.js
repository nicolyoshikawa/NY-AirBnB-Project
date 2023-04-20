'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "1 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Disney Lane",
        description: "Happiest place on earth",
        price: 123
      },
      {
        ownerId: 2,
        address: "2 Spa Place",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 38.7645358,
        lng: -123.4730327,
        name: "Spa House",
        description: "Place to relax",
        price: 123
      },
      {
        ownerId: 3,
        address: "3 Tree Circle",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Tree House",
        description: "Hang out in the treehouse",
        price: 123
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [ 1, 2, 3 ] }
    }, {});
  }
};
