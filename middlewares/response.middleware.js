const responseMiddleware = (req, res, next) => {
  try {
    const { error, message, ...rest } = req.body;
    if (error) {
      throw new Error(message);
    }
    res.status(200).json({
      ...rest,
    });
  } catch ({ message }) {
    res.status(404).json({
      error: true,
      message: message,
    });
  } finally {
    next();
  }
  next();
};

export { responseMiddleware };
