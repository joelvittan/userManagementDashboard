import React, { useState } from "react";
import {
  CircularProgress,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Delete,
  Edit,
  RemoveRedEye,
  Save,
  TramSharp,
} from "@mui/icons-material";

const UserList = ({
  formData,
  setFormData,
  setIsEditable,
  setIsDeleteDialogOpen,
  isEditable,
  setIsAddUSerDrawerOpen,
  userData,
  isLoading,
  handleUpdate,
}) => {
  const [page, setPage] = useState(1);
  const users = userData.slice((page - 1) * 10, page * 10);

  const handleEdit = (user) => {
    setIsEditable(true);
    setFormData(user);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="flex flex-col overflow-x-auto">
      <TableContainer className=" px-6">
        <Table>
          <TableHead >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading.isFetching ? (
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width={100} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={200} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={200} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={200} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={200} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={200} height={20} />
                  </TableCell>
                </TableRow>
              ))
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <input
                      type="text"
                      name="firstName"
                      value={
                        isEditable && formData.id === user.id
                          ? formData.firstName
                          : user.firstName
                      }
                      className="p-2 border border-[var(--primary)]"
                      onChange={handleChange}
                      disabled={!isEditable || formData.id !== user.id}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      name="lastName"
                      value={
                        isEditable && formData.id === user.id
                          ? formData.lastName
                          : user.lastName
                      }
                      className="p-2 border border-[var(--primary)]"
                      onChange={handleChange}
                      disabled={!isEditable || formData.id !== user.id}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="email"
                      name="email"
                      value={
                        isEditable && formData.id === user.id
                          ? formData.email
                          : user.email
                      }
                      className="p-2 border border-[var(--primary)]"
                      onChange={handleChange}
                      disabled={!isEditable || formData.id !== user.id}
                    />
                  </TableCell>
                  <TableCell>
                    <select
                      id="department"
                      name="department"
                      value={
                        isEditable && formData.id === user.id
                          ? formData.department
                          : user.department
                      }
                      className="p-2 border border-[var(--primary)]"
                      onChange={handleChange}
                      disabled={!isEditable || formData.id !== user.id}
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
                      <option value="Product Management">
                        Product Management
                      </option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {isEditable && formData.id === user.id ? (
                        <button
                          className="p-2 flex items-center border border-[var(--primary)]"
                          onClick={() => handleUpdate(formData.id)}
                        >
                          {isLoading.isUpdating ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : (
                            <span className="flex items-center gap-2">
                              <Save />
                              Update
                            </span>
                          )}
                        </button>
                      ) : (
                        <button
                          className="flex items-center"
                          onClick={() => handleEdit(user)}
                        >
                          <span className="flex items-center gap-2">
                            <Edit />
                            Edit
                          </span>
                        </button>
                      )}
                      <button
                        className="flex items-center"
                        onClick={() => {
                          setIsDeleteDialogOpen(true);
                          setFormData(user);
                        }}
                      >
                        <Delete />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="flex justify-center items-center h-screen w-screen">
                  <h1 className="text-2xl font-bold">No Users Found</h1>
                  <button
                    className="flex items-center gap-2"
                    onClick={() => setIsAddUSerDrawerOpen(true)}
                  >
                    Add User
                  </button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex gap-4 p-4 items-center self-center">
        <button
          className="flex items-center gap-2"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>{page}</span>
        <button
          className="flex items-center gap-2"
          onClick={handleNextPage}
          disabled={page * 10 >= userData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
