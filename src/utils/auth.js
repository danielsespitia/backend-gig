const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: 'No esta autorizado' });
      return;
    }

    const [_, token] = authorization.split(' ');
    if (!token) {
      res.status(401).json({ message: 'No esta autorizado' });
      return;
    }

    const { id } = jwt.verify(token, process.env.SECRET);

    req.user = id;

    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
