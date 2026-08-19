import {Box, Grid} from "@mui/material";
import ProductGridTableRow from "./ProductGridTableRow.tsx";

export default function ProductGridTable() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{m: 2}}>
          {
            Array.from({length: 12}).map(() => (
                <Grid size={{xs:12, sm:6, md:4, lg: 3}}>
                  <ProductGridTableRow />
                </Grid>
            ))
          }
        </Grid>
      </Box>
  )
}