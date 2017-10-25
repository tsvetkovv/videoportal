import bcrypt from 'bcrypt-nodejs';
import mongoose, { Schema } from 'mongoose';
import { USER_ROLES } from '../../constants';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
    },
    secondName: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: USER_ROLES.user,
      enum: Object.values(USER_ROLES),
    },
    password: {
      type: String,
      required: true,
    },
    claimedVideos: [
      {
        type: Schema.ObjectId,
        ref: 'Video',
      },
    ],
    favoriteVideos: [
      {
        type: Schema.ObjectId,
        ref: 'Video',
      },
    ],
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
