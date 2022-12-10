module.exports = (sequelize, Sequelize) => {
    const Temperature = sequelize.define("temperature", {
      id_station: {
        type: Sequelize.STRING,
      },      
      temparature: {
        type: Sequelize.FLOAT,
      },
      comment: {
        type: Sequelize.STRING,
      },  
      d_date: {
        type: Sequelize.DATE,
      }  
    }
  );
    return Temperature;
  };
