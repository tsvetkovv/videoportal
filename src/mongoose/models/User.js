import bcrypt from 'bcrypt-nodejs';
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: v => {
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
          return re.test(v);
        },
        message: 'Invalid email',
      },
    },
    emailConfirmed: {
      type: Boolean,
    },
    profile: {
      type: Schema.ObjectId,
      ref: 'UserProfile',
    },
    logins: {
      type: Schema.ObjectId,
      ref: 'UserLogin',
    },
    claims: {
      type: Schema.ObjectId,
      ref: 'UserClaim',
    },
  },
  {
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id; // eslint-disable-line  no-underscore-dangle, no-param-reassign
        delete ret._id; // eslint-disable-line  no-underscore-dangle, no-param-reassign
      },
    },
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id; // eslint-disable-line  no-underscore-dangle, no-param-reassign
        delete ret._id; // eslint-disable-line  no-underscore-dangle, no-param-reassign
      },
    },
  },
);

class UserClass {
  get id() {
    return this._id; // eslint-disable-line no-underscore-dangle
  }

  comparePassword(v) {
    return bcrypt.compareSync(v, this.password);
  }

  static generateHash(v) {
    return bcrypt.hashSync(v, bcrypt.genSaltSync(8), null);
  }
}

UserSchema.loadClass(UserClass);

export default mongoose.model('User', UserSchema);
