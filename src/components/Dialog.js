import React from "react";
import { Dialog as MatDialog, DialogContent } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

export default function Dialog({ open, close, title, children, maxWidth = "md", fullWidth = false }) {
  const classes = useStyles();

  return (
    <MatDialog open={open} onClose={close} fullWidth={fullWidth} maxWidth={maxWidth} aria-labelledby="dialog-title">
      <DialogTitle disableTypography id="dialog-title">
        <Typography variant="h6">{title}</Typography>
        {close && (
          <IconButton aria-label="close" className={classes.closeButton} onClick={close}>
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </MatDialog>
  );
}
