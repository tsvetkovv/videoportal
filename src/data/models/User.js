import bcrypt from 'bcrypt-nodejs';
import DataType from 'sequelize';
import Model from '../sequelize';

const User = Model.define('User', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  username: {
    type: DataType.STRING(100),
    unique: true,
    allowNull: false,
  },

  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
  },

  emailConfirmed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

  password: {
    type: DataType.STRING,
    allowNull: false,
  },
});

User.generateHash = function (password) { // eslint-disable-line
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.prototype.comparePassword = function (password) { // eslint-disable-line
  return bcrypt.compareSync(password, this.password);
};

export default User;
