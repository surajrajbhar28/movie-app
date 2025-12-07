const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllMovies,
  getSingleMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

router
  .route("/")
  .get(authenticateUser, getAllMovies)
  .post(authenticateUser, authorizePermissions("admin"), addMovie);

router
  .route("/:id")
  .get(authenticateUser, getSingleMovie)
  .patch(authenticateUser, authorizePermissions("admin"), updateMovie)
  .delete(authenticateUser, authorizePermissions("admin"), deleteMovie);

module.exports = router;
