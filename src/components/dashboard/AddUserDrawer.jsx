import React, { useState } from "react";
import {
  Drawer as MuiDrawer,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { postRequest } from "@/helper/helper";
import toast from "react-hot-toast";

const Drawer = ({ component: Component, open, onClose, name }) => {
  const [formData, setFormData] = useState({});

  const [isAddingUser, setIsAddingUser] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, firstName, lastName, email, department } = formData;

    if (!id || !firstName || !lastName || !email || !department) {
      toast.error("All fields are required");
      return;
    }
    setIsAddingUser(true);

    try {
      const response = await postRequest("users", formData);
      if (response.status === 201) {
        toast.success("User added successfully");
        setFormData({});
        onClose(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddingUser(false);
    }
  };

  return (
    <MuiDrawer
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: "400px", md: "500px" },
          padding: "16px",
          backgroundColor: "var(--primary-dark)",
        },
      }}
      
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between border-b">
          <Typography variant="h6" component="h2">
            {name}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="id">ID*</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName">First Name*</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName">Last Name*</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="department">Department*</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                defaultValue={""}
              >
                <option value="" disabled>
                  Select Department
                </option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
                <option value="Legal">Legal</option>
                <option value="Operations">Operations</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Research and Development">
                  Research and Development
                </option>
                <option value="Product Management">Product Management</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-[var(--primary)] text-white px-4 py-2 rounded flex items-center justify-center gap-2"
              disabled={isAddingUser}
            >
              {isAddingUser ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Add User"
              )}
            </button>
          </div>
        </form>
      </div>
    </MuiDrawer>
  );
};

export default Drawer;
