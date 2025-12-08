const Movie = require("../models/Movie");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllMovies = async (req, res) => {
  const { search, sort, order, page, limit } = req.query;

  const queryObject = {};

  // if (search) {
  //   queryObject.$or = [
  //     { title: { $regex: search, $options: "i" } },
  //     { description: { $regex: search, $options: "i" } },
  //   ];
  // }

  if (search) {
    const cleanSearch = search.replace(/\s+/g, "");

    queryObject.$or = [
      {
        $expr: {
          $regexMatch: {
            input: {
              $replaceAll: { input: "$title", find: " ", replacement: "" },
            },
            regex: cleanSearch,
            options: "i",
          },
        },
      },
      {
        $expr: {
          $regexMatch: {
            input: {
              $replaceAll: {
                input: "$description",
                find: " ",
                replacement: "",
              },
            },
            regex: cleanSearch,
            options: "i",
          },
        },
      },
    ];
  }

  const sortMap = {
    rating: "rating",
    name: "title",
    released: "releaseDate",
    duration: "duration",
  };

  const sortField = sortMap[sort] || "rating";
  const sortOrder = order === "asc" ? 1 : -1;
  const sortOptions = { [sortField]: sortOrder };

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 8;

  const skip = (pageNum - 1) * limitNum;

  const movies = await Movie.find(queryObject)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum);

  const totalMovies = await Movie.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalMovies / limitNum);

  res.status(StatusCodes.OK).json({
    count: movies.length,
    totalMovies,
    numOfPages,
    page: pageNum,
    movies,
  });
};

const getSingleMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  if (!movie) {
    throw new CustomError.NotFoundError(`No movie found with id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ movie });
};

const addMovie = async (req, res) => {
  const {
    title,
    description,
    rating,
    releaseDate,
    duration,
    genre,
    directors,
    writers,
    actors,
    mpaaRating,
    poster,
  } = req.body;

  if (!title || !releaseDate || !duration || !rating) {
    throw new CustomError.BadRequestError("Please provide all values ");
  }

  const movie = await Movie.create({
    title,
    description,
    rating,
    releaseDate,
    duration,
    genre,
    directors,
    writers,
    actors,
    mpaaRating,
    poster,
  });

  res.status(StatusCodes.CREATED).json({ movie });
};

const updateMovie = async (req, res) => {
  const { id } = req.params;

  const movie = await Movie.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    throw new CustomError.NotFoundError(`No movie found with id : ${id}`);
  }

  res.status(StatusCodes.OK).json({ movie });
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  if (!movie) {
    throw new CustomError.NotFoundError(`No movie found with id: ${id}`);
  }

  await movie.deleteOne();

  res.status(StatusCodes.OK).json({ message: "Movie deleted successfully" });
};

module.exports = {
  getAllMovies,
  getSingleMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
