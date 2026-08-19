import {Box, Button, Paper, Typography} from "@mui/material";
import { Link } from '@tanstack/react-router'

export default function ProductGridTableRow() {
  return (
      <Paper
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            alignItems: 'stretch',
            gap: 1.5,
            backgroundColor: '#F0EEE9',
            borderRadius: 2,
            borderColor: '#F0EEE9',
            width: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            transition: "transform 0.15s ease-in-out",
            "&:hover": { transform: "scale3d(1.02, 1.02, 1)" }
          }}
      >

        <Link to="/product" style={{ textDecoration: 'none', display: 'block' }}>
          <Box
             component="img"
              src="https://cdn.displate.com/artwork/2025-08-12/3941e9c93bc5868b89d336764f31ef21_83feec1967e6ddc3ad7170efe73e4407.jpg?speedsize=w_681" // 換成合適的耳機範例圖，或用你原本的網址
              alt="商品圖片原型"
              sx={{
                width: '100%',
                height: 483,
                borderRadius: 1,
                objectFit: 'cover',
                flexShrink: 0,
                border: '2px solid black'
              }}
          />
        </Link>

        <Box sx={{ width: '100%' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.3 }}>
            One Piece / Monkey D. Luffy
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Stock: In Stock
          </Typography>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff3d00' }}>
            Price: HK$ 100
          </Typography>
        </Box>

        <Button
            component={Link}
            to="/product"
            variant="contained"
            //color="primary"
            fullWidth
            size="medium"
            sx={{ borderRadius: 1.5, mt: 'auto', backgroundColor: "#607D8B" }}
        >
          More details
        </Button>
      </Paper>
  )
}