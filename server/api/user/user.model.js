export default class UserModel {
  constructor({
                id,
                login,
                password,
                name
              }) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.name = name;
  }
}
