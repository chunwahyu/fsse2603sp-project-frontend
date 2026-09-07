import {CircularProgress, IconButton, Stack, Typography} from "@mui/material";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface Props {
  quantity: number;
  handleQuantityMinusOne: () => void;
  handleQuantityPlusOne: () => void;
  isLoading?: boolean;
}

export default function QuantitySelector({
                                           quantity,
                                           handleQuantityMinusOne,
                                           handleQuantityPlusOne,
                                           isLoading = false
                                          }:Props) {
  return (
      <Stack
          direction="row"
          spacing={2}
          sx={{alignItems: "center"}}
      >
        <IconButton
            onClick={handleQuantityMinusOne}
            disabled={isLoading}
        >
          <RemoveRoundedIcon />
        </IconButton>
        {
          isLoading
            ? <CircularProgress
                  enableTrackSlot
                  sx={{color: "#607D8B"}}
              />
              : (
                  <Typography variant="body2">
                    {quantity}
                  </Typography>
              )
        }
        <IconButton
            onClick={handleQuantityPlusOne}
            disabled={isLoading}
        >
          <AddRoundedIcon />
        </IconButton>
      </Stack>
  )
}