import mongoose, { Schema } from 'mongoose';
import User from './User';
import { RATING_FOR_BLOCKING_VIDEO } from '../../constants';

const VideoSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    author: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    likedBy: [
      {
        type: Schema.ObjectId,
        ref: 'User',
      },
    ],
    dislikedBy: [
      {
        type: Schema.ObjectId,
        ref: 'User',
      },
    ],
    claimedBy: [
      {
        type: Schema.ObjectId,
        ref: 'User',
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

VideoSchema.pre('remove', (next, done) => {
  done();
  // TODO : ADD CASCADE DELETION FROM FAVORITE AND CLAIMED FOR AUTHOR
});

class VideoClass {
  get rating() {
    return this.likedBy.length;
  }

  async likeByUser(userId) {
    return this.update(
      {
        $push: {
          likedBy: userId,
        },
      },
      {
        safe: true,
      },
    );
  }

  async dislikeByUser(userId) {
    return this.update(
      {
        $push: {
          dislikedBy: userId,
        },
      },
      {
        safe: true,
      },
    );
  }

  async addToFavoriteToUser(userId) {
    await User.findOneAndUpdate(
      userId,
      {
        $push: {
          favoriteVideos: this.id,
        },
      },
      {
        safe: true,
      },
    );
  }

  async claim(userId) {
    await User.findOneAndUpdate(
      userId,
      {
        $push: {
          claimedVideos: this.id,
        },
      },
      {
        safe: true,
      },
    );

    return this.update(
      {
        $push: {
          claimedBy: userId,
        },
      },
      {
        safe: true,
      },
    );
  }

  static async findBlockedVideos() {
    return this.find({
      claimedBy: { $size: { $lt: RATING_FOR_BLOCKING_VIDEO } },
    });
  }
}

VideoSchema.loadClass(VideoClass);

export default mongoose.model('Video', VideoSchema);
