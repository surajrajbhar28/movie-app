require("dotenv").config();
require("express-async-errors");

const express = require("express");

const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./db/connect");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMidlleware = require("./middleware/error-handler");

app.use(morgan("tiny"));

app.use(
  cors({
    origin: "https://movie-app-frontend-8uts.onrender.com",
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", movieRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMidlleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
