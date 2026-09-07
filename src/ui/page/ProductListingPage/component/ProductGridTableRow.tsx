import {Box, Button, Paper, Tooltip, Typography} from "@mui/material";
import { Link } from '@tanstack/react-router'
import type {GetAllProductDto} from "../../../../data/product/ProductDto.type.ts";

interface Props {
  productDto : GetAllProductDto;
}

export default function ProductGridTableRow({productDto}: Props) {
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

        <Link
            to="/product/$productId"
            params={{
              productId: productDto.pid.toString()
            }}
            style={{
              textDecoration: 'none',
              display: 'block'
            }}
        >
          <Box
             component="img"
              src={productDto.imageUrl}
              alt="Product Image"
              sx={{
                width: '100%',
                height: 483,
                borderRadius: 1,
                objectFit: 'cover',
                flexShrink: 0,
                border: '2px solid black',
              }}
          />
        </Link>

        <Box sx={{ width: '100%'}}>
          <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                lineHeight: 1.3,
                minHeight: "50px"
              }}
          >
            {productDto.name}
          </Typography>
          <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
          >
            {productDto.hasStock ? "In Stock": "Out of Stock"}
          </Typography>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#ff3d00'
              }}
          >
            Price: HK$ {productDto.price.toLocaleString()}
          </Typography>
        </Box>
        <Tooltip title="Click here for more details">
          <Button
              component={Link}
              to={`/product/${productDto.pid}`}
              variant="contained"
              fullWidth
              size="medium"
              sx={{
                borderRadius: 50,
                mt: 'auto',
                backgroundColor: "#607D8B"
              }}
          >
            More details
          </Button>
        </Tooltip>
      </Paper>
  )
}