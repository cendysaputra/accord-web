export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} tidak ditemukan` });
};

export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Terjadi kesalahan pada server",
  });
};