import { Box, Button, Stack, Typography } from "@mui/material";
import { FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

function MovieFilter({ resetFilter, genres }) {
  return (
    <Stack
      className="genres"
      spacing={3}
      sx={{ display: { xs: "none", md: "flex", lg: "flex" }, p: 3, width: 200 }}
    >
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Genres
        </Typography>
        <FRadioGroup name="genres" options={genres} row={false} />
      </Stack>
      <Box>
        <Button
          size="medium"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={() => resetFilter()}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default MovieFilter;
