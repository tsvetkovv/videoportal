export function parseErrors(mongooseErr) {
  return Object.keys(mongooseErr.errors).map(key => ({
    key,
    message: mongooseErr.errors[key].properties.message,
  }));
}

export function someFunction() {}
