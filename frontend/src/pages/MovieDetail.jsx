import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router";
import {
  useDeleteMovie,
  useFetchMovieById,
} from "../hooks/reactQueryCustomHooks";
import { useSelector } from "react-redux";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useFetchMovieById(id);
  const { deleteMovie } = useDeleteMovie();
  const { user } = useSelector((state) => state.auth.userInfo);

  if (isLoading)
    return (
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={80} thickness={5} />
      </Container>
    );

  if (isError || !data || !data.movie) {
    const message =
      error?.response?.status === 404
        ? "Movie not found."
        : error?.message || "Something went wrong.";

    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h3">{message}</Typography>
        <Button
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
          startIcon={<ArrowBackIcon />}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  const movie = data.movie;
  const posterUrl = `${import.meta.env.VITE_STATIC_BASE_URL}${movie.poster}`;
  const releaseYear = new Date(movie.releaseDate).getFullYear();

  const handleEditMovie = () => {
    navigate(`/movie/${id}/edit`);
  };

  const handleDeleteMovie = () => {
    deleteMovie(id, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (err) => {
        console.error("Failed to delete:", err);
      },
    });
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        {user.role === "admin" && (
          <Box>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={handleEditMovie}
            >
              Edit Movie
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteMovie}
            >
              Delete Movie
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={posterUrl}
            alt={movie.title}
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" fontWeight="bold">
            {movie.title} ({releaseYear})
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Chip label={`Rating: ${movie.rating}`} />
            <Chip label={`${movie.duration} min`} />
            <Chip label={movie.mpaaRating} />
          </Box>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {movie.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6">Genre</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie.genre}
          </Typography>

          <Typography variant="h6">Directors</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie.directors.join(", ")}
          </Typography>

          <Typography variant="h6">Writers</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie.writers.join(", ")}
          </Typography>

          <Typography variant="h6">Actors</Typography>
          <Typography variant="body1">{movie.actors.join(", ")}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetail;
