const User = require('../models/users.model');
const Repair = require('../models/reapir.model');

const initModel = () => {
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModel;
