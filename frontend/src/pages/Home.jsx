import {
  Alert,
  Container,
  CircularProgress,
  Box,
  Typography,
  TextField,
  Button,
  Pagination,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CustomAppBar from "../components/AppBar";
import MovieList from "../components/MovieList";
import { useFetchMovies } from "../hooks/reactQueryCustomHooks";
import { useState } from "react";
import { useSearchParams } from "react-router";

const Home = () => {
  const [params, setParams] = useSearchParams();
  const [input, setInput] = useState(params.get("search") || "");
  const [page, setPage] = useState(Number(params.get("page")) || 1);
  const [sort, setSort] = useState(params.get("sort") || "rating");
  const [order, setOrder] = useState(params.get("order") || "desc");

  const search = params.get("search") || "";
  const { isLoading, isError, data, error } = useFetchMovies(
    search,
    page,
    sort,
    order
  );

  const handleSearch = () => {
    setPage(1);
    setParams({ search: input, page: 1, sort, order });
    setInput("");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setParams({ search, page: value, sort, order });
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSort(value);
    setPage(1);
    setParams({ search, page: 1, sort: value, order });
  };

  const handleOrderChange = (event) => {
    const value = event.target.value;
    setOrder(value);
    setPage(1);
    setParams({ search, page: 1, sort, order: value });
  };

  if (isError)
    return (
      <Container sx={{ mt: 10 }}>
        <Alert severity="error">{error.message}</Alert>
      </Container>
    );

  return (
    <Container>
      <Box
        sx={{
          mt: 13,
          mb: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Movies</Typography>

        <Box component="div" sx={{ display: "flex", gap: 1 }}>
          <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="order-select-label">Order</InputLabel>
              <Select
                labelId="order-select-label"
                id="order-select"
                value={order}
                label="Order"
                onChange={handleOrderChange}
              >
                <MenuItem value="asc">Asc</MenuItem>
                <MenuItem value="desc">Desc</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="sort-select-label">Sort</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
              >
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
                <MenuItem value="released">Release Year</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            sx={{ display: "flex", gap: 1 }}
          >
            <TextField
              label="search"
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" variant="contained">
              search
            </Button>
          </Box>
        </Box>
      </Box>

      <CustomAppBar />

      {isLoading ? (
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
      ) : !data || data.movies.length === 0 ? (
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Typography variant="h6">No movies found.</Typography>
          {search && (
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search keywords or filters.
            </Typography>
          )}
        </Box>
      ) : (
        <MovieList data={data} />
      )}

      {data && data.movies.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 7, mb: 4 }}>
          <Stack spacing={2}>
            <Pagination
              count={data.numOfPages}
              page={data.page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default Home;
