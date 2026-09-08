import {Grid, Paper, Typography} from "@mui/material";
import CheckOutGridTableRow from "./CheckOutGridTableRow.tsx";
import type {TransactionDto} from "../../../../data/transaction/transaction.type.ts";

interface Props {
  transactionDto: TransactionDto;
}

export default function CheckOutGridTable({transactionDto}: Props) {
  return (
      <>
        <Paper
            elevation={2}
            sx={{m: 1}}
        >
          <Grid
              container
              spacing={2}
              sx={{
                p: 2,
                display: {xs:"none", sm:"flex"},
                justifyContent: "center",
                alignItems: "center"
              }}
          >
            <Grid size={2}>

            </Grid>
            <Grid size={6}>
              <Typography variant="body1" align="center" sx={{fontWeight: "700"}}>Name</Typography>
            </Grid>
            <Grid size={1}>
              <Typography variant="body1" align="center" sx={{fontWeight: "700"}}>Unit Price</Typography>
            </Grid>
            <Grid size={1}>
              <Typography variant="body1" align="center" sx={{fontWeight: "700"}}>Quantity</Typography>
            </Grid>
            <Grid size={2}>
              <Typography variant="body1" align="center" sx={{fontWeight: "700"}}>Subtotal</Typography>
            </Grid>
          </Grid>
        </Paper>
        {
          transactionDto.items.map((item) => (
              <Paper
                  elevation={2}
                  sx={{m: 1}}
              >
                <CheckOutGridTableRow item={item}/>
              </Paper>
          ))
        }
      </>
  )
}