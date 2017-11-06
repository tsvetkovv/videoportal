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
        unique: true,
      },
    ],
    favoriteVideos: [
      {
        type: Schema.ObjectId,
        ref: 'Video',
        unique: true,
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

  static getFullProfile(query) {
    return this.findOne(query)
      .populate('claimedVideos')
      .populate({
        path: 'favoriteVideos',
        populate: { path: 'author' },
      });
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

  /* eslint-disable class-methods-use-this, no-unused-vars */
  async removeFromFavorite(videoId) {
    // TODO (meis) TBD
  }
  /* eslint-enable class-methods-use-this, no-unused-vars */

  async claim(videoId) {
    if (this.claimedVideos.includes(videoId)) {
      return false;
    }

    await this.update(
      {
        $push: {
          claimedVideos: videoId,
        },
      },
      {
        safe: true,
      },
    ).exec();

    await Video.findByIdAndUpdate(
      videoId,
      {
        $push: {
          claimedBy: this.id,
        },
        $set: {
          isWarning: {
            $cond: {
              if: {
                $gte: ['$claimedBy', CLAIMS_FOR_WARNING_VIDEO],
              },
              then: true,
            },
          },

          isBlocked: {
            $cond: {
              if: {
                $gte: ['$claimedBy', CLAIMS_FOR_BLOCKING_VIDEO],
              },
              then: true,
            },
          },
        },
      },
      {
        safe: true,
      },
    );

    return true;
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
}

UserSchema.loadClass(UserClass);

delete mongoose.connection.models.User;
export default mongoose.model('User', UserSchema);
