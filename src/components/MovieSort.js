import React from "react";
import { FSelect } from "./form";

function MovieSort({ genres }) {
  return (
    <FSelect
      name="genres"
      label="Genres"
      size="small"
      sx={{ display: { xs: "flex", md: "none", lg: "none" } }}
    >
      {genres?.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </FSelect>
  );
}

export default MovieSort;
