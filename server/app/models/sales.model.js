module.exports = (sequelize, Sequelize) => {
    const Sales = sequelize.define(
      "sales", 
      {
          id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 's_id'
              },
          id_text: {
                type: Sequelize.STRING,
                field: 'id_station'
            },
          purchase: {
                type: Sequelize.STRING
            },
          balance: {
                type: Sequelize.FLOAT
            },
          litr: {
                type: Sequelize.FLOAT
          },
          pay: {
                type: Sequelize.STRING
            },
          type_data_transfer: {
                  type: Sequelize.STRING
              },
          type_currency: {
                type: Sequelize.STRING
            },
          type_calculation: {
              type: Sequelize.STRING
          },
          s_date: {
                type: Sequelize.STRING
            },
          d_date: {
              type: Sequelize.DATE
            }  
      },
      {
        timestamps: false, // не используем поля CreatAt и updateAt
        tableName: 'sales',
      }
    );
 
    return Sales;
  };

