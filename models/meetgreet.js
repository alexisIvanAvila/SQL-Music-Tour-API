'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeetGreet extends Model {
      static associate({ Band, Event }) {
      // band
        MeetGreet.belongsTo(Band, {
          foreignKey: "id",
          as: "band"
      })

      // event
        MeetGreet.belongsTo(Event, {
          foreignKey: "event_id",
          as: "event"
      })
    }
  }

  MeetGreet.init({
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'MeetGreet',
  });
  return MeetGreet;
};