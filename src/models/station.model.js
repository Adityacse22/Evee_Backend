const { DataTypes } = require('sequelize');
const db = require('../db/database');
const sequelize = db.sequelize;

const Station = sequelize.define('Station', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.JSONB,
    allowNull: false,
    validate: {
      isValidLocation(value) {
        if (!value.lat || !value.lng) {
          throw new Error('Location must have lat and lng');
        }
      }
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plug_types: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  charging_speed: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  price_unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  availability: {
    type: DataTypes.JSONB,
    allowNull: false,
    validate: {
      isValidAvailability(value) {
        if (typeof value.total !== 'number' || typeof value.available !== 'number') {
          throw new Error('Availability must have total and available numbers');
        }
      }
    }
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    }
  },
  amenities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'stations',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Instance method to validate location
Station.prototype.validateLocation = function() {
  if (!this.location || !this.location.lat || !this.location.lng) {
    throw new Error('Invalid location data');
  }
};

// Instance method to validate availability
Station.prototype.validateAvailability = function() {
  if (!this.availability || 
      typeof this.availability.total !== 'number' || 
      typeof this.availability.available !== 'number') {
    throw new Error('Invalid availability data');
  }
};

// Hook to validate before saving
Station.beforeSave((station) => {
  station.validateLocation();
  station.validateAvailability();
});

module.exports = Station; 