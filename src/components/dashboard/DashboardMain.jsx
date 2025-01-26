import React, { useEffect, useState } from "react";
import Header from "./Header";
import UserList from "./UserList";
import DeleteDialog from "@/utils/DeleteDailog";
import { getRequest, postRequest, putRequest } from "@/helper/helper";
import toast from "react-hot-toast";
import Drawer from "@/components/dashboard/AddUserDrawer";

const DashboardMain = () => {
  const [isAddUSerDrawerOpen, setIsAddUSerDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState({
    isFetching: false,
    isUpdating: false,
  });

    const [isEditable, setIsEditable] = useState(false);
    

  const fetchUserData = async () => {
    setIsLoading({ isFetching: true });
    try {
      const response = await getRequest("users");
      if (response.status === 200) {
        setUserData(response.data);
      }
      if (response.data.length === 0) {
        toast.error("No users found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user data");
    } finally {
      setIsLoading({ isFetching: false });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUserData();
    }, 600000);
    fetchUserData();
    return () => clearInterval(interval);
  }, []);

    const handleUpdate = async (id) => {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.department) {
        toast.error("All fields are required");
        setIsLoading({ isUpdating: false });
        return;
      }

    setIsLoading({ isUpdating: true });
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        department: formData.department,
      };
      const response = await putRequest(`users/${id}`, payload);
      if (response.status === 200) {
        setFormData(response.data);
        setIsEditable(false);
        fetchUserData();
        toast.success("User data updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user data");
    } finally {
      setIsLoading({ isUpdating: false });
      setIsEditable(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 text-[var(--primary)]">
      <Header
        setIsAddUSerDrawerOpen={setIsAddUSerDrawerOpen}
        isLoading={isLoading}
        fetchUsers={fetchUserData}
      />
      <UserList
        formData={formData}
        userData={userData}
        setFormData={setFormData}
        setIsEditable={setIsEditable}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isEditable={isEditable}
        setIsAddUSerDrawerOpen={setIsAddUSerDrawerOpen}
        isLoading={isLoading}
        handleUpdate={handleUpdate}
      />

      <Drawer
        name={"Add User"}
        open={isAddUSerDrawerOpen}
        onClose={() => setIsAddUSerDrawerOpen(false)}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setFormData({});
        }}
        title={`Delete User ${formData.firstName} ${formData.lastName}`}
        url={`users/${formData.id}`}
        func={fetchUserData}
        data={formData}
      />
    </div>
  );
};

export default DashboardMain;
