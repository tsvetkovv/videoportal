// 500
export default (err, req, res, next) => {
  res.status(err.status || 500);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    message: err.message,
    error: err
  }));
};
