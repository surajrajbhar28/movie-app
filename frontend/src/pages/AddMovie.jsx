import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAddMovie } from "../hooks/reactQueryCustomHooks";

const AddMovie = () => {
  const navigate = useNavigate();
  const { addMovie, isLoading } = useAddMovie();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      rating: "",
      releaseDate: "",
      duration: "",
      genre: "",
      directors: "",
      writers: "",
      actors: "",
      mpaaRating: "Not Rated",
      description: "",
    },
  });

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      directors: formData.directors
        ? formData.directors.split(",").map((d) => d.trim())
        : [],
      writers: formData.writers
        ? formData.writers.split(",").map((w) => w.trim())
        : [],
      actors: formData.actors
        ? formData.actors.split(",").map((a) => a.trim())
        : [],
    };

    addMovie(payload, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (err) => {
        console.error("Failed to add movie:", err);
      },
    });
  };

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Container>
      <Container maxWidth="sm" sx={{ mb: 5 }}>
        <Paper elevation={10} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Add Movie
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Title is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 300, message: "Maximum 300 characters" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />

            <Controller
              name="rating"
              control={control}
              rules={{
                required: "Rating is required",
                min: { value: 0, message: "Minimum rating is 0" },
                max: { value: 10, message: "Maximum rating is 10" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Rating"
                  type="number"
                  inputProps={{ step: 0.1, min: 0, max: 10 }}
                  fullWidth
                  error={!!errors.rating}
                  helperText={errors.rating?.message}
                />
              )}
            />

            <Controller
              name="releaseDate"
              control={control}
              rules={{ required: "Release date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Release Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.releaseDate}
                  helperText={errors.releaseDate?.message}
                />
              )}
            />

            <Controller
              name="duration"
              control={control}
              rules={{ required: "Duration is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Duration (minutes)"
                  type="number"
                  fullWidth
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                />
              )}
            />

            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Genre" fullWidth />
              )}
            />

            <Controller
              name="directors"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Directors (comma separated)"
                  fullWidth
                />
              )}
            />

            <Controller
              name="writers"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Writers (comma separated)"
                  fullWidth
                />
              )}
            />

            <Controller
              name="actors"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Actors (comma separated)"
                  fullWidth
                />
              )}
            />

            <Controller
              name="mpaaRating"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <InputLabel id="mpaa-select-label">MPAA Rating</InputLabel>
                  <Select
                    {...field}
                    labelId="mpaa-select-label"
                    label="MPAA Rating"
                  >
                    <MenuItem value="G">G</MenuItem>
                    <MenuItem value="PG">PG</MenuItem>
                    <MenuItem value="PG-13">PG-13</MenuItem>
                    <MenuItem value="R">R</MenuItem>
                    <MenuItem value="NC-17">NC-17</MenuItem>
                    <MenuItem value="Not Rated">Not Rated</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 1000, message: "Maximum 1000 characters" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Movie"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default AddMovie;
