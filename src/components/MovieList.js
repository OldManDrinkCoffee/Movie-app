import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieList({ movies, loading }) {
  return (
    <Grid
      className="movie-list"
      container
      spacing={{ xs: 0, md: 2, lg: 2 }}
      rowSpacing={{ xs: 2 }}
      mt={1}
      sx={{ width: { xs: "100%" } }}
    >
      {movies?.map((movie, index) => (
        <Grid key={movie.id} item xs={12} md={4} lg={3}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieList;
