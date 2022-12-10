module.exports = (sequelize, Sequelize) => {
    const Ikey = sequelize.define(
      "ikey", 
      {
          id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'i_id'
              },
          id_text: {
                type: Sequelize.STRING,
                field: 'id_station'
            },
          ikey: {
                type: Sequelize.STRING
            },
          s_date: {
                type: Sequelize.STRING
            },
          d_date: {
              type: Sequelize.DATE
            },  
          balance: {
              type: Sequelize.FLOAT
            },
          balance_litr: {
              type: Sequelize.FLOAT
            },
          number_u: {
              type: Sequelize.INTEGER
            },
          type_key: {
            type: Sequelize.STRING
        }, 
      },
      {
        timestamps: false, // не используем поля CreatAt и updateAt
        tableName: 'ikey',
      }
    );
 
    return Ikey;
  };

