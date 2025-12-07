import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const MovieCard = ({ movie }) => {
  const releaseYear = new Date(movie.releaseDate).getFullYear();
  const posterUrl = `${import.meta.env.VITE_STATIC_BASE_URL}${movie.poster}`;

  return (
    <Card
      sx={{
        width: 250,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          src={posterUrl}
          sx={{
            width: "100%",
            aspectRatio: "2 / 3",
            objectFit: "cover",
          }}
        />

        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              minHeight: 48,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {movie.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography variant="body2">
              {Number(movie.rating).toFixed(1)}
            </Typography>
            <Typography variant="body2">{movie.duration} min</Typography>
            <Typography variant="body2">{releaseYear}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
