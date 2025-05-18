const { DataTypes } = require('sequelize');
const db = require('../db/database');
const sequelize = db.sequelize;

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  hashed_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  tableName: 'users',
  defaultScope: {
    attributes: { exclude: ['hashed_password'] }
  }
});

module.exports = User; 