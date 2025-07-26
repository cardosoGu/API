/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { schema: 'escola', tableName: 'alunos' },
      'user_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { schema: 'escola', tableName: 'Users' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn({ schema: 'escola', tableName: 'alunos' }, 'user_id');
  },
};
