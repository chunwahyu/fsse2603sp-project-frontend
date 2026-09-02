import {Box, CircularProgress} from "@mui/material";

export default function LoadingContainer() {
  return (
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            width: "100%"
          }}
      >
        <CircularProgress enableTrackSlot size="3rem" aria-label="Loading…" />
      </Box>
  )
}