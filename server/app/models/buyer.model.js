module.exports = (sequelize, Sequelize) => {
    const Buyer = sequelize.define("buyer", {
      id_station: {
        type: Sequelize.STRING,
      },      
      qty: {
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
    return Buyer;
  };
