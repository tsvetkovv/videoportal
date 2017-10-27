import bcrypt from 'bcrypt-nodejs';
import mongoose, { Schema } from 'mongoose';
import {
  USER_ROLES,
  CLAIMS_FOR_BLOCKING_VIDEO,
  CLAIMS_FOR_WARNING_VIDEO,
} from '../../constants';

import Video from './Video';

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

  async addToFavorite(videoId) {
    return this.update(
      {
        $push: {
          favoriteVideos: videoId,
        },
      },
      {
        safe: true,
      },
    );
  }

  async claim(userId) {
    await this.update(
      {
        $push: {
          claimedVideos: this.id,
        },
      },
      {
        safe: true,
      },
    ).exec();

    return Video.findOneAndUpdate(
      {
        $push: {
          claimedBy: userId,
        },
        isWarning:
          this.claimedBy.length + 1 === CLAIMS_FOR_WARNING_VIDEO ||
          this.isWarning,
        isBlocked:
          this.claimedBy.length + 1 === CLAIMS_FOR_BLOCKING_VIDEO ||
          this.isBlocked,
      },
      {
        safe: true,
      },
    );
  }

  async like(videoId) {
    return Video.findOneAndUpdate(
      videoId,
      {
        $push: {
          likedBy: this.id,
        },
        $pull: {
          dislikedBy: this.id,
        },
        $inc: {
          rating: 1,
        },
      },
      {
        safe: true,
      },
    );
  }

  async dislike(videoId) {
    return Video.findOneAndUpdate(
      videoId,
      {
        $push: {
          dislikedBy: this.id,
        },
        $pull: {
          likedBy: this.id,
        },
        $inc: {
          rating: -1,
        },
      },
      {
        safe: true,
      },
    );
  }

  async createVideo(video) {
    return Video.create(...video, { author: this.id });
  }
}

UserSchema.loadClass(UserClass);

export default mongoose.model('User', UserSchema);
