const express = require("express");

const app = express();
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globleErrorHandler = require("./controllers/errorController");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const router = require("./routes");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Docs Test",
      version: "1.0.0",
      description: "Apis testing and docments",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./routes/*.js", "./routes/schemas/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/public`));

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  next();
});

app.use(router);
app.use(globleErrorHandler);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
