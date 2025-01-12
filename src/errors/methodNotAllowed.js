function methodNotAllowed(req, res, next) {
  res.status(405).json({ error: "Method not allowed" });
}

module.exports = methodNotAllowed;