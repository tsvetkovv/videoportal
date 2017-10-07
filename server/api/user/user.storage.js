import UserModel from './user.model';
import * as bcrypt from 'bcrypt';
import errors from './user.errors';

export default class UserStorage {
  static async getList() {
    // return the array of models
  }

  static async getById(id) {
    // return the model
  }

  static async getByLogin(login) {
    // return the model
  }

  static async create(userModel) {
    const {
      login,
      password,
      name = 'name_stub'
    } = userModel;

    // return id of new user
  }

  static async checkCredentials(login, password) {
    const user = await UserStorage.getByLogin(login);
    if (!user) {
      throw Error(errors.notFound);
    }
    const hash = user.password;

    if (await bcrypt.compare(password, hash)) {
      return user;
    }
    return null;
  }
}
