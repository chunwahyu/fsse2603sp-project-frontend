import {Box, CircularProgress, Typography} from "@mui/material";

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
        <Typography
            variant="h6"
            sx={{
              color: "#607D8B",
              mx: 2
            }}
        >
          LOADING
        </Typography>

        <CircularProgress
            enableTrackSlot
            size="3rem"
            aria-label="Loading…"
            sx={{color: "#607D8B"}}
        />
      </Box>
  )
}