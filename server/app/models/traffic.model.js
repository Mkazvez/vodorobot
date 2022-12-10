module.exports = (sequelize, Sequelize) => {
    const Traffic = sequelize.define(
      "traffic", 
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
          traffic: {
                type: Sequelize.INTEGER
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
        tableName: 'traffic',
      }
    );
 
    return Traffic;
  };

