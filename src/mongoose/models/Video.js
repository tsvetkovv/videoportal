import mongoose, { Schema } from 'mongoose';
import {
  CLAIMS_FOR_BLOCKING_VIDEO,
  CLAIMS_FOR_WARNING_VIDEO,
  DEFAULT_VIDEO_LIMIT,
  RATING_FOR_HIDING_VIDEO,
} from '../../constants';

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
});

VideoSchema.pre('remove', (next, done) => {
  done();
  // TODO : ADD CASCADE DELETION FROM FAVORITE AND CLAIMED FOR AUTHOR
});

VideoSchema.virtual('rating').get(function() {
  // // TODO to think about formula without conditions
  // // -100 when only dislikes, 100 when only likes, otherwise scaling between ones
  // if (this.dislikedBy.length && !this.likedBy.length) return -100;
  // if (!this.dislikedBy.length && !this.likedBy.length) return 0;
  // if (!this.dislikedBy.length && this.likedBy.length) return 100;
  // return (
  //   (this.likedBy.length / (this.dislikedBy.length + this.likedBy.length) -
  //     0.5) *
  //   100
  // );

  return this.likedBy.length - this.dislikedBy.length;
});

VideoSchema.virtual('isWarning').get(function() {
  return this.checkWarning();
});

VideoSchema.virtual('isBlocked').get(function() {
  return this.checkBlock();
});

class VideoClass {
  async clearClaims() {
    return this.update(
      {
        $set: {
          claimedBy: [],
        },
      },
      {
        safe: true,
        new: true,
      },
    ).exec();
  }

  static async commonAllVisibleQuery(additionalPipeLine = [], limit) {
    const aggregatedVideos = await this.aggregate([
      {
        $limit: limit || DEFAULT_VIDEO_LIMIT,
      },
      {
        $addFields: {
          rating: {
            $subtract: [
              { $add: { $size: '$likedBy' } },
              { $size: '$dislikedBy' },
            ],
          },
        },
      },
      {
        $match: {
          rating: { $gte: RATING_FOR_HIDING_VIDEO },
        },
      },
      ...additionalPipeLine,
    ]).exec();
    return this.populate(aggregatedVideos, 'author');
  }

  checkWarning() {
    return this.claimedBy.length >= CLAIMS_FOR_WARNING_VIDEO;
  }

  checkBlock() {
    return this.claimedBy.length >= CLAIMS_FOR_BLOCKING_VIDEO;
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
          $sort: { rating: -1, date: -1 },
        },
      ],
      limit,
    );
  }

  static async getBlockedVideos() {
    // TODO optimizable
    return this.find({
      $where: `this.claimedBy.length >= ${CLAIMS_FOR_WARNING_VIDEO}`,
    });
  }
}

VideoSchema.loadClass(VideoClass);

delete mongoose.connection.models.Video;
export default mongoose.model('Video', VideoSchema);
