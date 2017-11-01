import { GraphQLError } from 'graphql';

class ErrorType extends GraphQLError {
  constructor(errors) {
    const lastError = errors[errors.length - 1];
    // main message
    super((lastError && lastError.key) || lastError.message || 'error');

    this.state = errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        // eslint-disable-next-line no-param-reassign
        result[error.key].push(error.message);
      } else {
        // eslint-disable-next-line no-param-reassign
        result[error.key] = [error.message];
      }
      return result;
    }, {});
  }
}

export default ErrorType;
