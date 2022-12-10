module.exports = (sequelize, Sequelize) => {
    const Tips = sequelize.define(
      "tips", 
      {
          id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 't_id'
              },
          id_text: {
                type: Sequelize.STRING,
                field: 'id_station'
            },
          tips_balance: {
                type: Sequelize.FLOAT,
            },
          s_date: {
                type: Sequelize.STRING
            },
          d_date: {
              type: Sequelize.DATE
            },
          comment: {
            type: Sequelize.STRING
            },    
      },
      {
        timestamps: false, // не используем поля CreatAt и updateAt
        tableName: 'tips',
      }
    );
 
    return Tips;
  };

