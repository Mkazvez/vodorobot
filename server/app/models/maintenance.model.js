module.exports = (sequelize, Sequelize) => {
    const Maintenance = sequelize.define("maintenance", {
      id_station: {
        type: Sequelize.STRING,
      },      
      date_replace: {
        type: Sequelize.DATE,
      },
      type_catrige: {
        type: Sequelize.STRING,
      },
      qty_litr: {
        type: Sequelize.FLOAT,
      },
      procent_of_used: {
        type: Sequelize.FLOAT,
      },
      status: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING,
      },    
      d_date: {
        type: Sequelize.DATE,
      },
    }
  );
    return Maintenance;
  };
