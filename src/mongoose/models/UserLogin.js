import mongoose, { Schema } from 'mongoose';

const UserLoginSchema = new Schema({
  name: {
    type: String,
    ref: 'User',
  },

  key: {
    // TODO
    type: Schema.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('UserLogin', UserLoginSchema);
export { UserLoginSchema };
