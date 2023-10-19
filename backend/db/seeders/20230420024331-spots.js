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
        address: "1 Treehouse Court",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Comfort house",
        description: "Comfort in a tree",
        price: 123
      },
      {
        ownerId: 1,
        address: "2 Treehouse Court",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 75.7645358,
        lng: 72.4730327,
        name: "Best Treehouse",
        description: "A cozy treehouse nestled in SF",
        price: 528
      },
      {
        ownerId: 1,
        address: "3 Treehouse Court",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 43.7645358,
        lng: 34.4730327,
        name: "City Treehouse",
        description: "City living with a twist",
        price: 342
      },
      {
        ownerId: 1,
        address: "4 Treehouse Court",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 83.7645358,
        lng: 84.4730327,
        name: "Clean, sturdy Treehouse",
        description: "Sturdy, clean treehouse",
        price: 732
      },
      {
        ownerId: 1,
        address: "5 Treehouse Court",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: -43.7645358,
        lng: -34.4730327,
        name: "Modern Treehouse",
        description: "Cozy treehouse",
        price: 211
      },
      {
        ownerId: 2,
        address: "6 Spa Place",
        city: "Sacramento",
        state: "California",
        country: "United States of America",
        lat: 24.7645358,
        lng: -23.4730327,
        name: "Spa House",
        description: "Place to relax",
        price: 111
      },
      {
        ownerId: 2,
        address: "7 Spa Place",
        city: "Sacramento",
        state: "California",
        country: "United States of America",
        lat: 56.7645358,
        lng: 44.4730327,
        name: "Jacuzzi House",
        description: "House with a jacuzzi inside",
        price: 222
      },
      {
        ownerId: 2,
        address: "8 Spa Place",
        city: "Sacramento",
        state: "California",
        country: "United States of America",
        lat: 76.7645358,
        lng: 23.4730327,
        name: "Oasis House",
        description: "Place to relax",
        price: 333
      },
      {
        ownerId: 2,
        address: "9 Spa Place",
        city: "Sacramento",
        state: "California",
        country: "United States of America",
        lat: 54.7645358,
        lng: -54.4730327,
        name: "Spa House Luxury Villa",
        description: "Place to relax",
        price: 444
      },
      {
        ownerId: 2,
        address: "10 Spa Place",
        city: "Sacramento",
        state: "California",
        country: "United States of America",
        lat: 87.7645358,
        lng: -23.4730327,
        name: "Tiny house with jacuzzi",
        description: "Cozy living with a relaxing jacuzzi",
        price: 555
      },
      {
        ownerId: 3,
        address: "11 Beach",
        city: "San Diego",
        state: "California",
        country: "United States of America",
        lat: 66.7645358,
        lng: 30.4730327,
        name: "Lux Beach House",
        description: "Beach front house",
        price: 2390
      },
      {
        ownerId: 3,
        address: "12 Tree Circle",
        city: "San Diego",
        state: "California",
        country: "United States of America",
        lat: 23.7645358,
        lng: -41.4730327,
        name: "Stylish beach house",
        description: "Stylish beach house in sunny San Diego",
        price: 682
      },
      {
        ownerId: 3,
        address: "13 Tree Circle",
        city: "San Diego",
        state: "California",
        country: "United States of America",
        lat: 41.7645358,
        lng: 122.4730327,
        name: "Modern Beach House",
        description: "Modern stay near the beach",
        price: 142
      },
      {
        ownerId: 3,
        address: "14 Tree Circle",
        city: "San Diego",
        state: "California",
        country: "United States of America",
        lat: 77.7645358,
        lng: -111.4730327,
        name: "Coastal Beach House",
        description: "Cozy beach house",
        price: 233
      },
      {
        ownerId: 3,
        address: "15 Tree Circle",
        city: "San Diego",
        state: "California",
        country: "United States of America",
        lat: -37.7645358,
        lng: -22.4730327,
        name: "Beach House",
        description: "Oasis stay with a private beach",
        price: 1230
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ] }
    }, {});
  }
};
