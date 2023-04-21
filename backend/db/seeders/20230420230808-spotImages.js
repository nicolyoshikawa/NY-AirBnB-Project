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
        url: "https://user-images.githubusercontent.com/112415366/233506013-ed9f81aa-82ba-4285-a41c-8dd3b5e720fe.png",
        spotId: 1,
        preview: true
      },
      {
        url: "https://user-images.githubusercontent.com/112415366/233506138-6779fbf9-3557-402a-9510-757cc4ec10dc.jpeg",
        spotId: 2,
        preview: true
      },
      {
        url: "https://user-images.githubusercontent.com/112415366/233506288-b08a9fa2-7148-402c-b30a-83ae65fab4a6.jpeg",
        spotId: 3,
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
