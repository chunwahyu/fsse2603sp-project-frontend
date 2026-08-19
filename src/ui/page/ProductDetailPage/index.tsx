import {Box, Button, Grid, IconButton, Typography} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

export default function ProductDetailPage() {
  return (
      <>
        <Typography variant="h6">
          Product Detail Page
        </Typography>

        <Grid container spacing={4} sx={{alignItems: "center", m: 4}}>

          <Grid size={{xs:12, sm:12, md:6}} sx={{display: "flex", justifyContent: "center"}}>
            <Box
                component="img"
                src="https://cdn.displate.com/artwork/2025-08-12/3941e9c93bc5868b89d336764f31ef21_83feec1967e6ddc3ad7170efe73e4407.jpg?speedsize=w_681"
                alt="Luffy"
                sx={{
                  width: "auto",
                  maxHeight: 500,
                  border: "2px solid black",
                  boxShadow: 3
                }}
            />
          </Grid>

          <Grid size={{xs:12, sm:12, md:6}} sx={{display: "flex", justifyContent: "center"}}>
            <Box
              component="div" sx={{display:"flex", flexDirection: "column", gap: 1.5}}
            >
              <Typography variant="h6" sx={{fontWeight: "bold"}}>Name: Monkey D. Luffy</Typography>
              <Typography variant="h6" color="error">Price: HK$100</Typography>
              <Typography variant="body1">Description: Gear 5 Wanted Poster ("DEAD OR ALIVE")</Typography>
              <Box component="div" sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <IconButton>
                  <RemoveRoundedIcon />
                </IconButton>
                <Typography variant="body2">1</Typography>
                <IconButton>
                  <AddRoundedIcon />
                </IconButton>
                <IconButton>
                  <AddShoppingCartRoundedIcon />
                </IconButton>

                <Button startIcon={<AddShoppingCartRoundedIcon />}>Add to cart</Button>

              </Box>
            </Box>
          </Grid>

        </Grid>
      </>
  )
}