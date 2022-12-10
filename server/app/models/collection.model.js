module.exports = (sequelize, Sequelize) => {
    const Collection = sequelize.define("collection", {
      id_station: {
        type: Sequelize.STRING,
      },      
      balance: {
        type: Sequelize.FLOAT,
      },
      id_user: {
        type: Sequelize.INTEGER,
      },
      user_string: {
        type: Sequelize.STRING,
      },
      date_maintenance: {
        type: Sequelize.DATE,
      },
      comment: {
        type: Sequelize.STRING,
      },  
      d_date: {
        type: Sequelize.DATE,
      }   
    }
  );
    return Collection;
  };
