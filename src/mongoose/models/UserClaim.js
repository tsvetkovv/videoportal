import mongoose, { Schema } from 'mongoose';

const UserClaimSchema = new Schema({
  type: {
    type: String,
  },
  value: {
    type: String,
  },
});

export default mongoose.model('UserClaim', UserClaimSchema);
export { UserClaimSchema };
