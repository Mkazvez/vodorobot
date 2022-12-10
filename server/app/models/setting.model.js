module.exports = (sequelize, Sequelize) => {
    const Setting = sequelize.define(
      "setting", 
      {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'se_id'
            },
            id_text: {
                type: Sequelize.STRING,
                field: 'id_station'
            },
            exr1: {
                type: Sequelize.INTEGER
            },
            exr2: {
                type: Sequelize.INTEGER
            },
            tONexr1: {
                type: Sequelize.INTEGER
            },
            mONexr1: {
                type: Sequelize.INTEGER
            },
            tONexr2: {
                type: Sequelize.INTEGER
            },
            mONexr2: {
                type: Sequelize.INTEGER
            },
            tOFFexr1: {
                type: Sequelize.INTEGER
            },
            tOFFexr2: {
                type: Sequelize.INTEGER
            },
            mOFFexr1: {
                type: Sequelize.INTEGER
            },
            mOFFexr2: {
                type: Sequelize.INTEGER
            },
            player: {
                type: Sequelize.INTEGER
            },
            se_date: {
                type: Sequelize.STRING
            },
            d_date: {
              type: Sequelize.DATE
            }  
      },
      {
        timestamps: false, // не используем поля CreatAt и updateAt
        tableName: 'setting',
      }
    );
 
    return Setting;
  };
