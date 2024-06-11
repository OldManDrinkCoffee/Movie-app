import React, { useState, useEffect, useCallback } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import MovieFilter from "../components/MovieFilter";
import MovieSearch from "../components/MovieSearch";
import MovieList from "../components/MovieList";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { Pagination } from "@mui/material";
import "./styles.css";
import { debounce } from "lodash";
import MovieSort from "../components/MovieSort";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [response, setResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);

  const handleChange = (event, value, query, genreId) => {
    setCurrentPage(value);
    if (search === false) {
      getMovies(value);
    } else {
      searchMovie(value, query);
      getMovieByGenre(genreId);
    }
  };
  const defaultValues = {
    genres: [],
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();
  const filterMovies = applyFilter(response.results, filters);
  const genreId = filters.genres;

  const getMovies = async (page) => {
    setLoading(true);
    try {
      const res = await apiService.get("/movie/popular", {
        params: {
          page: page,
        },
      });
      setResponse(res.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMovies(1);
    getGenres();
  }, []);

  useEffect(() => {
    getMovieByGenre(genreId);
  }, [genreId]);

  const getMovieByGenre = async (genreId) => {
    setLoading(true);

    try {
      const res = await apiService.get("/discover/movie", {
        params: {
          with_genres: genreId,
        },
      });

      setResponse(res.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };

  const getGenres = async () => {
    setLoading(true);
    try {
      const res = await apiService.get("/genre/movie/list", {
        params: {},
      });
      setGenres(res.data.genres);
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };

  const searchMovie = async (page, query) => {
    setLoading(true);
    try {
      const res = await apiService.get("/search/movie", {
        params: {
          query: query,
          page: page,
        },
      });
      setResponse(res.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const processChange = useCallback(
    debounce((searchInfor) => {
      if (searchInfor) {
        searchMovie(1, searchInfor);
      } else {
        getMovies(1);
      }
    }, 1000),
    [searchMovie, getMovies]
  );
  return (
    <Container
      sx={{ display: "flex", minHeight: "100vh", width: "100vw", mt: 3 }}
    >
      <Stack>
        <FormProvider methods={methods}>
          <MovieFilter resetFilter={reset} genres={genres} />
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1, width: "100%" }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <MovieSearch
              onChange={(e) => {
                const query = e.target.value;
                setQuery(query);
                processChange(query);
                setSearch(true);
              }}
            />
            <MovieSort genres={genres} resetFilter={reset} />
          </Stack>
        </FormProvider>
        <Box sx={{ position: "relative", height: 1, width: "100%" }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <MovieList movies={filterMovies} />
              )}
            </>
          )}
        </Box>
        <div className="pagination">
          <Pagination
            size="small"
            count={
              response && response.total_pages < 500
                ? response.total_pages
                : 500
            }
            page={currentPage}
            onChange={(event, page) =>
              handleChange(event, page, query, genreId)
            }
          />
        </div>
      </Stack>
    </Container>
  );
}

function applyFilter(movies, filters) {
  let filteredMovies = movies;

  if (filters.searchQuery) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }

  return filteredMovies;
}

export default HomePage;
