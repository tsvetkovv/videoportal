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
    default: false,
  },
  isWarning: {
    type: Boolean,
    default: false,
  },
});

VideoSchema.pre('remove', (next, done) => {
  done();
  // TODO : ADD CASCADE DELETION FROM FAVORITE AND CLAIMED FOR AUTHOR
});

class VideoClass {
  static getAllVisibleVideos(limit) {
    return this.find({
      isBlocked: false,
      rating: { $gt: RATING_FOR_HIDING_VIDEO },
    })
      .limit(limit)
      .populate('author');
  }

  static async getNewestVideos(limit) {
    return this.getAllVisibleVideos(limit).sort({ date: -1 });
  }

  static async getPopularVideos(limit) {
    return this.getAllVisibleVideos(limit).sort({ rating: 1, date: -1 });
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
