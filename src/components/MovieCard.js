import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/movie/${movie.id}`)}>
      <CardActionArea>
        <CardMedia
          className="movie-pic"
          component="img"
          height="200"
          image={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path}
          alt="Picture not found"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div" noWrap>
            {movie.original_title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
