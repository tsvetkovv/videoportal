import mongoose, { Schema } from 'mongoose';
import { RATING_FOR_HIDING_VIDEO } from '../../constants';

const VideoSchema = new Schema({
  youtubeId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  rating: {
    type: Number,
    default: 0,
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
  isBlocked: {
    type: Boolean,
  },
  isWarning: {
    type: Boolean,
  },
});

VideoSchema.pre('remove', (next, done) => {
  done();
  // TODO : ADD CASCADE DELETION FROM FAVORITE AND CLAIMED FOR AUTHOR
});

class VideoClass {
  static async getAllVisibleVideos() {
    return this.find({
      isBlocked: false,
      rating: { $gt: RATING_FOR_HIDING_VIDEO },
    });
  }

  static async getNewestVideos() {
    return this.getAllVisibleVideos().sort('-date');
  }

  static async getPopularVideos() {
    return this.getAllVisibleVideos().sort('rating');
  }

  static async getBlockedVideos() {
    return this.find({
      $or: [{ isWarning: true }, { isBlocked: true }],
    });
  }
}

VideoSchema.loadClass(VideoClass);

delete mongoose.connection.models.Video;
export default mongoose.model('Video', VideoSchema);
