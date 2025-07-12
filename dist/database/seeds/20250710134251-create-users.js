"use strict";const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) { // faz um bulkAdd users fake para testes
    await queryInterface.bulkInsert(
      { schema: 'escola', tableName: 'Users' },
      [
        {
          nome: 'Luiz',
          email: 'luiz@gmail.com',
          password_hash: await bcrypt.hash('minhasenha123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Luiz 2',
          email: 'luiz2@gmail.com',
          password_hash: await bcrypt.hash('minhasenha123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          nome: 'Luiz 3',
          email: 'luiz3@gmail.com',
          password_hash: await bcrypt.hash('minhasenha123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },

      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete({ // bulk delete de usuarios testes
      schema: 'escola', tableName: 'Users',
    }, {
      email: [
        'luiz@gmail.com',
        'luiz2@gmail.com',
        'luiz3@gmail.com',
      ],
    });
  },
};
