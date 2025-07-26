/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      { schema: 'escola', tableName: 'alunos' },
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    // volta para o estado anterior da coluna, ex:
    await queryInterface.changeColumn(
      { schema: 'escola', tableName: 'alunos' },
      'email',
      {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
    );
  },

};
