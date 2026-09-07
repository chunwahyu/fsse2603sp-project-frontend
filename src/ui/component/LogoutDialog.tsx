import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export type DialogActionType = 'logout' | 'cancel';

interface Props {
  open: boolean;
  onClose: (action: DialogActionType) => void;
}

export default function LogoutDialog({open, onClose}: Props) {
  return (
      <>
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Log Out"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
                variant="contained"
                sx={{
                  backgroundColor: "#607D8B",
                  borderRadius: 50
                }}
                onClick={() => {onClose("cancel")}}
                autoFocus
            >
              Cancel
            </Button>
            <Button
                variant="contained"
                sx={{
                  backgroundColor: "#607D8B",
                  borderRadius: 50
                }}
                onClick={() => {onClose("logout")}}
            >
              Log Out
            </Button>
          </DialogActions>
        </Dialog>
      </>
  )
}