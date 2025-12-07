import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../utils";

export const useFetchMovies = (search, page, sort, order) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["movies", search, page, sort, order],
    queryFn: async () => {
      const { data } = await api.get(`/movies/`, {
        params: { search, page, sort, order },
      });
      return data;
    },
  });

  return { isLoading, isError, data, error };
};

export const useFetchMovieById = (id) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data } = await api.get(`/movies/${id}`);

      return data;
    },
  });
  return { isLoading, isError, data, error };
};

export const useEditMovie = () => {
  const queryClient = useQueryClient();

  const { mutate: editMovie, isLoading } = useMutation({
    mutationFn: ({ id, updatedMovie }) =>
      api.patch(`/movies/${id}`, updatedMovie),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie", variables.id] });
    },
  });

  return { editMovie, isLoading };
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteMovie, isLoading } = useMutation({
    mutationFn: (id) => api.delete(`/movies/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  return { deleteMovie, isLoading };
};

export const useAddMovie = () => {
  const queryClient = useQueryClient();

  const { mutate: addMovie, isLoading } = useMutation({
    mutationFn: (newMovie) => api.post("/movies", newMovie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  return { addMovie, isLoading };
};
