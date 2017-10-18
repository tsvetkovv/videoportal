import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';

// UserSchema.pre('remove', next => {
//   UserProfile.remove({
//     user: this._id,
//   }).exec();
//   UserLogin.remove({
//     name: this.username,
//   }).exec();

//   // TODO: Cascade deletion
//   // UserClaim.remove({
//   //   user: this._id,
//   // }).exec();
// });

export { User, UserLogin, UserClaim, UserProfile };
