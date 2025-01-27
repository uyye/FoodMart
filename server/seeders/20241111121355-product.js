'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Products", [
    {
      "name": "Burger Keju",
      "category": "Makanan",
      "description": "Burger dengan daging sapi dan keju cheddar leleh",
      "price": 25000,
      "stock": 50,
      "imageUrl": "https://awsimages.detik.net.id/community/media/visual/2022/07/03/resep-cheese-burger-ala-amerika.jpeg?w=1200",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Ayam Goreng Crispy",
      "category": "Makanan",
      "description": "Ayam goreng dengan kulit renyah dan daging lembut",
      "price": 20000,
      "stock": 60,
      "imageUrl": "https://asset.kompas.com/crops/pbx_yXJty_AXSF_LLbyppjE8A1k=/72x15:952x601/1200x800/data/photo/2022/08/01/62e73d60a9595.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Hotdog Sosis Jumbo",
      "category": "Makanan",
      "description": "Hotdog dengan sosis jumbo, saus, dan mayones",
      "price": 22000,
      "stock": 40,
      "imageUrl": "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/53a8180a-cf71-4770-b090-6ea212e0723e_Go-Biz_20201207_224101.jpeg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Kentang Goreng",
      "category": "Makanan",
      "description": "Kentang goreng renyah dengan taburan garam",
      "price": 15000,
      "stock": 70,
      "imageUrl": "https://asset.kompas.com/crops/uiglQeNS8ybI_kMT_XMr4i5QspE=/0x2:880x588/1200x800/data/photo/2022/09/14/632159cd811f2.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Pizza Slice",
      "category": "Makanan",
      "description": "Potongan pizza dengan topping pepperoni dan keju",
      "price": 30000,
      "stock": 30,
      "imageUrl": "https://t4.ftcdn.net/jpg/06/95/07/01/360_F_695070170_fBWWqhZx3V7iJZPYoC2jSRWvM0EJguaG.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Nugget Ayam",
      "category": "Makanan",
      "description": "Nugget ayam renyah yang cocok sebagai camilan",
      "price": 12000,
      "stock": 80,
      "imageUrl": "https://asset.kompas.com/crops/rYoocgq6K-uowFPn6X8CaljxoiM=/66x44:944x629/1200x800/data/photo/2021/10/16/616a559fe2c61.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Sandwich Telur",
      "category": "Makanan",
      "description": "Sandwich dengan isian telur, sayuran, dan mayones",
      "price": 18000,
      "stock": 55,
      "imageUrl": "https://www.masakapahariini.com/wp-content/uploads/2023/10/Resep-Sandwich-Telur-Mayones.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Taco Daging Sapi",
      "category": "Makanan",
      "description": "Taco dengan isian daging sapi cincang dan sayuran",
      "price": 25000,
      "stock": 45,
      "imageUrl": "https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/red-meats-&-red-meat-dishes/beef-tacos-with-spicy-tomato-sauce/main-header.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Milkshake Cokelat",
      "category": "Minuman",
      "description": "Milkshake cokelat dingin dengan topping krim",
      "price": 18000,
      "stock": 50,
      "imageUrl": "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/f96d7695-f24d-4a23-9501-f905b6553211/Derivates/95630b7c-f682-435a-85e7-c1d22048a22c.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Soda Lemon",
      "category": "Minuman",
      "description": "Minuman soda dengan rasa lemon segar",
      "price": 12000,
      "stock": 100,
      "imageUrl": "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/3/10/005c5fa1-0a11-4312-a203-e4411ae157a8.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Es Kopi Latte",
      "category": "Minuman",
      "description": "Kopi latte dingin dengan es batu",
      "price": 20000,
      "stock": 65,
      "imageUrl": "https://asset.kompas.com/crops/VlLcr2P4E15i1idoJCN4mFWdpB4=/113x47:913x580/1200x800/data/photo/2024/05/02/663290feb5358.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Smoothie Stroberi",
      "category": "Minuman",
      "description": "Smoothie stroberi segar dengan susu dan es batu",
      "price": 15000,
      "stock": 55,
      "imageUrl": "https://assets-cloudflare.segari-ops.id/recipes/smoothies-strawberry-lsbc8eveOgbTK.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Onion Rings",
      "category": "Makanan",
      "description": "Cincin bawang goreng renyah",
      "price": 10000,
      "stock": 70,
      "imageUrl": "https://assets-cloudflare.segari-ops.id/recipes/smoothies-strawberry-lsbc8eveOgbTK.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Churros Cokelat",
      "category": "Makanan",
      "description": "Churros renyah dengan saus cokelat",
      "price": 15000,
      "stock": 60,
      "imageUrl": "https://www.sasa.co.id/medias/page_medias/resep_onion_ring.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Kebab Ayam",
      "category": "Makanan",
      "description": "Kebab dengan isian ayam, sayuran, dan saus",
      "price": 25000,
      "stock": 40,
      "imageUrl": "https://asset.kompas.com/crops/5Gzc8Iao3991ewGg1L1D67aLg-4=/0x0:1000x667/1200x800/data/photo/2020/05/21/5ec61e2c3a23c.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    },
    {
      "name": "Cappuccino Panas",
      "category": "Minuman",
      "description": "Cappuccino panas dengan taburan bubuk cokelat",
      "price": 18000,
      "stock": 50,
      "imageUrl": "https://asset.kompas.com/crops/aVxdr5DfIF9uFJ0w3QX4FkT6JJY=/100x114:900x647/1200x800/data/photo/2023/10/23/6536a299a300a.jpg",
      "createdAt": "2024-11-11T10:00:00Z",
      "updatedAt": "2024-11-11T10:00:00Z"
    }
  ],{}
  )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {})
  }
};
