'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    static associate({ MeetGreet, SetTime }) {
      // meet and greets
      Band.hasMany(MeetGreet, {
        foreignKey: "id",
        as: "meet_greets"
      })

      // set times 
      Band.hasMany(SetTime, {
        foreignKey: "id",
        set_times: "set_times"
      })  
    }
  }

  Band.init({
    name: DataTypes.STRING,
    genre: DataTypes.TEXT,
    available_start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    recommendation: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Band',
    tableName: 'bands',
  });
  return Band;
};