module.exports = (sequelize, Sequelize) => {
    const Setup = sequelize.define(
      "setup", 
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
            price: {
                type: Sequelize.FLOAT,
            },
            discount: {
                type: Sequelize.FLOAT,
            },
            twater: {
                type: Sequelize.FLOAT,
            },
            tifw: {
                type: Sequelize.FLOAT,
            },
            Free: {
                type: Sequelize.FLOAT,
            },
            discountONclock: {
                type: Sequelize.INTEGER,
            },
            discountONminute: {
                type: Sequelize.INTEGER,
            },
            discountOFFclock: {
                type: Sequelize.INTEGER,
            },
            discountOFFminute: {
                type: Sequelize.INTEGER,
            },
            MoDe: {
                type: Sequelize.INTEGER,
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
        tableName: 'setup',
      }
    );
 
    return Setup;
  };
