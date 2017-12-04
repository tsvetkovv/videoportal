export const VIDEO_UPLOADED = 'VIDEO_UPLOADED';
export const VIDEO_CHANGE_RATING = 'VIDEO_CHANGE_RATING';
export const VIDEO_CLAIMED = 'VIDEO_CLAIMED';
export const VIDEO_CHANGE_FAV = 'VIDEO_CHANGE_FAV';

export const videoUploaded = ({
  rating,
  isFavorite,
  isLiked,
  isDisliked,
  isClaimed,
}) => ({
  type: VIDEO_UPLOADED,
  payload: {
    rating,
    isFavorite,
    isLiked,
    isDisliked,
    isClaimed,
  },
});

export const videoChangeRating = ({ rating, isLiked, isDisliked }) => ({
  type: VIDEO_CHANGE_RATING,
  payload: {
    rating,
    isLiked,
    isDisliked,
  },
});

export const videoClaimed = ({ isClaimed }) => ({
  type: VIDEO_CLAIMED,
  payload: {
    isClaimed,
  },
});

export const videoChangeFav = ({ isFavorite }) => ({
  type: VIDEO_CHANGE_FAV,
  payload: {
    isFavorite,
  },
});
