import {Grid, Paper, Typography} from "@mui/material";
import ShoppingCartGridTableRow from "./ShoppingCartGridTableRow.tsx";
import type {CartItemDto} from "../../../../data/cartItem/cartItem.type.ts";

interface Props {
  userCartList: CartItemDto[];
  handleQuantityChangeByPid: (pid: number, quantity: number) => void;
  handleDeleteByPid: (pid: number) => void;
}

export default function ShoppingCartGridTable({
                                                userCartList,
                                                handleQuantityChangeByPid,
                                                handleDeleteByPid
                                              }: Props) {
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
          >
            <Grid size={2}>
              <Typography variant="body1"></Typography>
            </Grid>
            <Grid size={5}>
              <Typography variant="body1" align="center" sx={{fontWeight: "700"}}>Name</Typography>
            </Grid>
            <Grid size={1}>
              <Typography variant="body1" align="center" sx={{fontWeight: "700"}}>Unit Price</Typography>
            </Grid>
            <Grid size={2}>
              <Typography variant="body1" align="center" sx={{fontWeight: "700"}}>Quantity</Typography>
            </Grid>
            <Grid size={1}>
              <Typography variant="body1" align="center" sx={{fontWeight: "700"}}>Sub-Total</Typography>
            </Grid>
            <Grid size={1}>
              <Typography variant="body1" sx={{fontWeight: "700"}}></Typography>
            </Grid>
          </Grid>
        </Paper>
        {
          userCartList.map((cartItem) => (
              <Paper elevation={2} sx={{m: 1}}>
                <ShoppingCartGridTableRow
                    key={cartItem.pid}
                    cartItem={cartItem}
                    handleQuantityChangeByPid={handleQuantityChangeByPid}
                    handleDeleteByPid={handleDeleteByPid}
                />
              </Paper>
          ))
        }
      </>
  )
}