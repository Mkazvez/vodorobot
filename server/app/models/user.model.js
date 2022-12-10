module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'user_id'
        },
        user_login: {
          type: Sequelize.STRING
        },
        user_password: {
          type: Sequelize.STRING
        },
        user_hash: {
          type: Sequelize.STRING
        },
        user_ip: {
          type: Sequelize.BIGINT
        },
        name: {
          type: Sequelize.STRING
        },
        date_in: {
          type: Sequelize.DATE
        },
        date_out: {
          type: Sequelize.DATE
        },
        post: {
          type: Sequelize.STRING
        }
},
      {
        timestamps: false, // не используем поля CreatAt и updateAt
        tableName: 'users',
      }
    )
    Users.associate = function(models) {
      // associations can be defined here
    }
    return Users
  }
  