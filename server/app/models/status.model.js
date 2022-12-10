module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define(
      "status", 
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
          valve: {
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
        tableName: 'status',
      }
    );
 
    return Status;
  };

