const express = require("express");
const { NotFoundError } = require("./expressError");
const authRoutes = require("./authAPI-routes/auth");
const app = express();

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(express.json());
app.use("/auth", authRoutes);

/**Handle 404 errors. Matches almost everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/**Generic handler, any unhandled errors go here */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
