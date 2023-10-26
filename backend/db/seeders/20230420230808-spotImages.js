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
        url: "https://hips.hearstapps.com/hmg-prod/images/treehouse-6-1592422507.jpeg",
        spotId: 1,
        preview: true
      },
      {
        url: "https://www.bayarea.com/wp-content/uploads/2017/06/cfda4949_original.jpg",
        spotId: 2,
        preview: true
      },
      {
        url: "https://www.kron4.com/wp-content/uploads/sites/11/2021/09/2JZtn4OA.jpeg",
        spotId: 3,
        preview: true
      },
      {
        url: "https://static.wixstatic.com/media/60f527_5614703e719345e6a38c90c47efe45b5~mv2.jpg",
        spotId: 4,
        preview: true
      },
      {
        url: "https://imageio.forbes.com/specials-images/imageserve/648916c1be9483831575c365/Tree-Haus/960x0.jpg",
        spotId: 5,
        preview: true
      },
      {
        url: "https://cdn.decoist.com/wp-content/uploads/2012/12/Stylish-at-home-spa-room-with-contemporary-amenities.jpg",
        spotId: 6,
        preview: true
      },
      {
        url: "https://hips.hearstapps.com/hmg-prod/images/kohler-spa-2-6451799b2a318.jpg",
        spotId: 7,
        preview: true
      },
      {
        url: "https://islandstone.com/cdn/shop/articles/Desert_Oasis_Luxury_Show_House_000_1200x600_crop_center.jpg",
        spotId: 8,
        preview: true
      },
      {
        url: "https://images.trvl-media.com/lodging/7000000/6030000/6024000/6023993/51bf6662.jpg",
        spotId: 9,
        preview: true
      },
      {
        url: "https://tinyhousetalk.com/wp-content/uploads/tinywood-homes-tiny-house-on-wheels-with-hut-tub-in-england-001.jpg",
        spotId: 10,
        preview: true
      },
      {
        url: "https://i.pinimg.com/736x/cd/bd/9c/cdbd9c927b4c79996acca1c51fbcb4a0.jpg",
        spotId: 11,
        preview: true
      },
      {
        url: "https://www.thenewyorkoptimist.net/uploads/6/6/7/3/66739453/esteegubbay3_orig.jpg",
        spotId: 12,
        preview: true
      },
      {
        url: "https://jh2architects.com/wp-content/uploads/2020/08/Coronado_02-EXT.jpg",
        spotId: 13,
        preview: true
      },
      {
        url: "https://cdn.onekindesign.com/wp-content/uploads/2018/07/Beach-Style-Cozy-Cottage-01-1-Kindesign.jpg",
        spotId: 14,
        preview: true
      },
      {
        url: "https://privatevillacollection.gracebayresorts.com/wp-content/uploads/sites/5/2019/12/Seaclusion-pool-beach_06-scaled.jpg",
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
