import { Grid, Link } from "@mui/material";
import MovieCard from "./MovieCard";
import { Link as RouterLink } from "react-router";

export default function MovieList({ data }) {
  return (
    <div>
      <Grid container spacing={3}>
        {data.movies.map((movie) => (
          <Grid key={movie._id} size={3}>
            <Link
              component={RouterLink}
              to={`/movie/${movie._id}`}
              sx={{ textDecoration: "none" }}
            >
              <MovieCard movie={movie} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
