import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { deleteRequest } from "@/helper/helper";
import toast from "react-hot-toast";

const DeleteDialog = ({ open, onClose, title, url, data, func }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteRequest(url);
      if (response.status === 200) {
        toast.success("User deleted successfully");
        onClose();
        func();
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxWidth: "500px",
              border: "2px solid var(--primary)",
              backgroundColor: "var(--primary-light)",
        },
          }}
          
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>Are you sure you want to delete this item?</DialogContent>
      <DialogActions>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleDelete} className="!bg-[var(--secondary)]" disabled={isDeleting}>
          Delete
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
