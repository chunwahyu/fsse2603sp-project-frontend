import {Box, Grid, IconButton, Tooltip, Typography} from "@mui/material";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import type {CartItemDto} from "../../../../data/cartItem/cartItem.type.ts";
import {deleteCartItem, patchCartItemQuantity} from "../../../../api/cartItemApi.ts";
import {useState} from "react";

interface Props {
  cartItem: CartItemDto;
  handleQuantityChangeByPid: (pid: number, quantity: number) => void;
  handleDeleteByPid: (pid: number) => void;
}

export default function ShoppingCartGridTableRow({
                                                   cartItem,
                                                   handleQuantityChangeByPid,
                                                   handleDeleteByPid
                                                  }: Props) {

  const [isQuantityChanged, setIsQuantityChanged] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleMinusOneClick = async () => {
    if(cartItem.cartQuantity <= 1) {
      return;
    }
    setIsQuantityChanged(true);
    await patchCartItemQuantity(cartItem.pid, cartItem.cartQuantity - 1);
    handleQuantityChangeByPid(cartItem.pid, cartItem.cartQuantity - 1);
    setIsQuantityChanged(false);
  }

  const handlePlusOneClick = async () => {
    if(cartItem.cartQuantity >= cartItem.stock) {
      return;
    }
    setIsQuantityChanged(true);
    await patchCartItemQuantity(cartItem.pid, cartItem.cartQuantity + 1);
    handleQuantityChangeByPid(cartItem.pid, cartItem.cartQuantity + 1);
    setIsQuantityChanged(false);
  }

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    await deleteCartItem(cartItem.pid);
    handleDeleteByPid(cartItem.pid);
    setIsDeleting(false);
  }

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
            size={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
        >
          <Box
              component="img"
              src={cartItem.imageUrl}
              alt="Cart Image"
              sx={{
                height: 80
              }}
          />
        </Grid>
        <Grid size={5}>
          <Typography variant="body1" align="center">{cartItem.name}</Typography>
        </Grid>
        <Grid size={1}>
          <Typography variant="body1" align="center">HK${cartItem.price.toLocaleString()}</Typography>
        </Grid>
        <Grid
            size={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
        >
          <QuantitySelector
              quantity={cartItem.cartQuantity}
              handleQuantityMinusOne={handleMinusOneClick}
              handleQuantityPlusOne={handlePlusOneClick}
              isLoading={isQuantityChanged}
          />
        </Grid>
        <Grid size={1}>
          <Typography
              variant="body1"
              align="center"
          >
            HK${(cartItem.price * cartItem.cartQuantity).toLocaleString()}
          </Typography>
        </Grid>
        <Grid
            size={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
        >
          <Tooltip title="Remove Item">
            <IconButton
                onClick={handleDeleteClick}
                disabled={isDeleting}
            >
              <DeleteRoundedIcon color="error"/>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
  )
}