import mongoose, { Schema } from 'mongoose';
import { RATING_FOR_HIDING_VIDEO, DEFAULT_VIDEO_LIMIT } from '../../constants';

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
  static async commonAllVisibleQuery(additionalPipeLine = [], limit) {
    const aggregatedVideos = await this.aggregate([
      {
        $limit: limit || DEFAULT_VIDEO_LIMIT,
      },
      {
        $addFields: {
          rating_for_sort: {
            $subtract: [
              { $add: { $size: '$likedBy' } },
              { $size: '$dislikedBy' },
            ],
          },
        },
      },
      {
        $match: {
          isBlocked: false,
          rating_for_sort: { $gte: RATING_FOR_HIDING_VIDEO },
        },
      },
      ...additionalPipeLine,
    ]).exec();
    return this.populate(aggregatedVideos, 'author');
  }

  static async getNewestVideos(limit) {
    return this.commonAllVisibleQuery(
      [
        {
          $sort: { date: -1 },
        },
      ],
      limit,
    );
  }

  static async getPopularVideos(limit) {
    return this.commonAllVisibleQuery(
      [
        {
          $sort: { rating_for_sort: -1, date: -1 },
        },
      ],
      limit,
    );
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
