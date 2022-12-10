module.exports = (sequelize, Sequelize) => {
    const Station = sequelize.define("station", {
      id_station: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },      
      start: {
        type: Sequelize.DATE,
      },
      adres: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },    
      comment: {
        type: Sequelize.STRING,
      },
      d_date: {
        type: Sequelize.DATE,
      }    
    }
  );
    return Station;
  };
