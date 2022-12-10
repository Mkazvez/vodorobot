module.exports = (sequelize, Sequelize) => {
    const Ownerstation = sequelize.define("ownerstation", {
      id_station: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },      
      comment: {
        type: Sequelize.STRING,
      },
      datebegin: {
        type: Sequelize.DATE,
      },
      dateend: {
        type: Sequelize.DATE,
      },    
      d_date: {
        type: Sequelize.DATE,
      },    
    }
  );
    return Ownerstation;
  };
