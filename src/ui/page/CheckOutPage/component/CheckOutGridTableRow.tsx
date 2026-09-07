import {Box, Grid, Typography} from "@mui/material";
import type {TransactionItem} from "../../../../data/transaction/transaction.type.ts";

interface Props {
  item: TransactionItem;
}

export default function CheckOutGridTableRow({item}: Props) {
  return (
      <Grid
          container
          spacing={2}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
      >
        <Grid
            size={{xs:2}}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
        >
          <Box
              component="img"
              src={item.product.imageUrl}
              alt="Poster Image"
              sx={{
                height: 80,
                maxWidth: "100%",
                objectFit: "contain"
              }}
          />
        </Grid>
        <Grid size={{xs:6}}>
          <Typography
              variant="body1"
              align="center"
          >
            {item.product.name}
          </Typography>
        </Grid>
        <Grid size={{xs:1}}>
          <Typography
              variant="body1"
              align="center"
          >
            HK${item.product.price.toLocaleString()}
          </Typography>
        </Grid>
        <Grid size={{xs:1}}>
          <Typography
              variant="body1"
              align="center"
          >
            {item.quantity}
          </Typography>
        </Grid>
        <Grid size={{xs:2}}>
          <Typography
              variant="body1"
              align="center"
          >
            HK${item.subTotal.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
  )
}