import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Edit from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import FlexBox from "@/components/flexbox/FlexBox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { ACCESS_LEVELS, PLAN_STATUS } from "@/__fakeData__/users";
import { toast } from "react-toastify";
import { DB, functions } from "@/contexts/firebaseContext.jsx";
import { deleteUser } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

const getAccessLevelColor = (level) => {
  // console.log({level});
  // console.log({ACCESS_LEVELS});

  switch (level) {
    case ACCESS_LEVELS.FREE:
      return {
        backgroundColor: "#f3f4f6",
        textColor: "#374151",
        borderColor: "#d1d5db",
      };
    case ACCESS_LEVELS.PREMIUM:
      return {
        backgroundColor: "#dbeafe",
        textColor: "#1d4ed8",
        borderColor: "#3b82f6",
      };
    case ACCESS_LEVELS.UNLIMITED:
      return {
        backgroundColor: "#fef3c7",
        textColor: "#d97706",
        borderColor: "#f59e0b",
      };
    case "Enterprise": // Handle undefined ACCESS_LEVELS.ENTERPRISE
      return {
        backgroundColor: "#e0e7ff",
        textColor: "#6366f1",
        borderColor: "#8b5cf6",
      };
    case "VIP": // Handle undefined ACCESS_LEVELS.VIP
      return {
        backgroundColor: "#fce7f3",
        textColor: "#be185d",
        borderColor: "#ec4899",
      };
    default:
      return {
        backgroundColor: "#f3f4f6",
        textColor: "#6b7280",
        borderColor: "#d1d5db",
      };
  }
};

const getPlanStatusColor = (status) => {
  switch (status) {
    case PLAN_STATUS.ACTIVE:
      return {
        backgroundColor: "#dcfce7",
        textColor: "#166534",
        borderColor: "#22c55e",
      };
    case PLAN_STATUS.TRIAL:
      return {
        backgroundColor: "#fef3c7",
        textColor: "#92400e",
        borderColor: "#f59e0b",
      };
    case PLAN_STATUS.EXPIRED:
      return {
        backgroundColor: "#fee2e2",
        textColor: "#dc2626",
        borderColor: "#ef4444",
      };
    case PLAN_STATUS.INACTIVE:
      return {
        backgroundColor: "#f3f4f6",
        textColor: "#4b5563",
        borderColor: "#9ca3af",
      };
    default:
      return {
        backgroundColor: "#f3f4f6",
        textColor: "#6b7280",
        borderColor: "#d1d5db",
      };
  }
};

export default function UserTableRow(props) {
  const { t } = useTranslation();
  const {
    user,
    isSelected,
    handleSelectRow,
    handleDeleteUser,
    handleUpdateUser,
    fetchUsers,
    handleOpenEditUser,
  } = props;
  console.log(user);
  console.log(props, "props");

  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAccessDialog, setOpenAccessDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state for access level management
  const [formData, setFormData] = useState({
    accessLevel: user.accessLevel,
    planStatus: user.planStatus,
    subscriptionEnd: user.subscriptionEnd || "",
  });

  const handleOpenMenu = (event) => {
    setOpenMenuEl(event.currentTarget);
  };

  const handleCloseOpenMenu = () => setOpenMenuEl(null);

  // Handle Delete Confirmation
  const handleDeleteConfirmation = () => {
    setOpenDeleteDialog(true);
    handleCloseOpenMenu();
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const functions = getFunctions();
// const deleteUserAccount = httpsCallable(functions, "deleteUserAccount");

const handleDeleteConfirm = async () => {
  setIsDeleting(true);
  try {
    // 1. Delete from Firebase Auth via custom backend
    const response = await fetch(`${import.meta.env.VITE_Base_URL}/delete-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: user.id }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unknown error");

    // 2. Delete Firestore document from 'users' collection
    const userRef = doc(DB, "users", user.id); // 'user.id' should match the Firestore document ID
    await deleteDoc(userRef);

    toast.success("User deleted successfully ✅");
    await fetchUsers();
    setOpenDeleteDialog(false);
  } catch (err) {
    console.error("Error deleting user: ", err);
    toast.error("Error: " + err.message);
  } finally {
    setIsDeleting(false);
  }
};



  // Handle Access Level Management
  const handleAccessLevelManagement = () => {
    setOpenAccessDialog(true);
    handleCloseOpenMenu();
    // Reset form data when opening dialog
    setFormData({
      accessLevel: user.accessLevel,
      planStatus: user.planStatus,
      subscriptionEnd: user.subscriptionEnd || "",
    });
  };

  const handleAccessDialogCancel = () => {
    setOpenAccessDialog(false);
    // Reset form data
    setFormData({
      accessLevel: user.accessLevel,
      planStatus: user.planStatus,
      subscriptionEnd: user.subscriptionEnd || "",
    });
  };

  const handleAccessDialogSave = () => {
    if (handleUpdateUser) {
      const updatedUser = {
        ...user,
        accessLevel: formData.accessLevel,
        planStatus: formData.planStatus,
        subscriptionEnd: formData.subscriptionEnd || null,
      };
      handleUpdateUser(updatedUser);
    }
    setOpenAccessDialog(false);
    toast.success(t("User access level updated successfully"));
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  const accessLevelStyle = getAccessLevelColor(user.accessLevel);
  const planStatusStyle = getPlanStatusColor(user.planStatus);

  return (
    <>
      <TableRow hover>
        {/* <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            checked={isSelected}
            onClick={(event) => handleSelectRow(event, user.id)}
          />
        </TableCell> */}

        <TableCell padding="normal">
          <FlexBox alignItems="center" gap={2}>
            <div>
              <Paragraph fontWeight={500} color="text.primary">
                {user?.deviceId || "-"}
              </Paragraph>
            </div>
          </FlexBox>
        </TableCell>
        <TableCell padding="normal">
          <div>
            <Paragraph fontWeight={500} color="text.primary">
              {user?.email || "-"}
            </Paragraph>
          </div>
        </TableCell>

        <TableCell padding="normal">
          <div>
            <Paragraph fontWeight={500} color="text.primary">
              {user?.freeAnalysisUsed !== undefined
                ? Math.abs(user.freeAnalysisUsed)
                : "-"}
            </Paragraph>
          </div>
        </TableCell>

        <TableCell padding="normal">
          <Chip
            label={user?.deviceModel}
            size="small"
            sx={{
              backgroundColor: "transparent",
              color: accessLevelStyle.textColor,
              fontWeight: 600,
              fontSize: "0.75rem",
              height: "28px",
              "& .MuiChip-label": {
                px: 1.5,
              },
            }}
          />
        </TableCell>

        <TableCell padding="normal">
          <Chip
            label={user?.platform}
            size="small"
            sx={{
              backgroundColor: "transparent",
              color: planStatusStyle.textColor,
              fontWeight: 600,
              fontSize: "0.75rem",
              height: "28px",
              "& .MuiChip-label": {
                px: 1.5,
              },
            }}
          />
        </TableCell>
        <TableCell padding="normal">
          <Chip
            label={user?.osVersion}
            size="small"
            sx={{
              backgroundColor: planStatusStyle.backgroundColor,
              color: planStatusStyle.textColor,
              border: `1px solid ${planStatusStyle.borderColor}`,
              fontWeight: 600,
              fontSize: "0.75rem",
              height: "28px",
              "& .MuiChip-label": {
                px: 1.5,
              },
            }}
          />
        </TableCell>

        <TableCell padding="normal">
          <Paragraph>
            {user?.lastLogin instanceof Date
              ? `${user.lastLogin.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })} - ${user.lastLogin.toLocaleDateString("en-GB")}`
              : "Never"}
          </Paragraph>
        </TableCell>

        <TableCell padding="normal">
          <TableMoreMenu
            open={openMenuEl}
            handleOpen={handleOpenMenu}
            handleClose={handleCloseOpenMenu}
          >
            {/* <TableMoreMenuItem
              Icon={AdminPanelSettings}
              title={t("Manage Access")}
              handleClick={() => handleAccessLevelManagement(user.id)}
            /> */}
            <TableMoreMenuItem
              Icon={Edit}
              title={t("Edit User")}
              handleClick={() => {
                handleCloseOpenMenu();
                props.handleOpenEditUser(user); // Pass selected user
              }}
            />

            <TableMoreMenuItem
              Icon={DeleteOutline}
              title={t("Delete User")}
              handleClick={() => handleDeleteConfirmation(user.id)}
            />
          </TableMoreMenu>
        </TableCell>
      </TableRow>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>
          {t("Are you sure you want to delete this user?")}
        </DialogTitle>
        <DialogContent>
          <Paragraph>{t("This action cannot be undone.")}</Paragraph>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={() => handleDeleteConfirm(user.id)} color="error">
            {isDeleting ? t("Deleting...") : t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Access Level Management Dialog */}
      <Dialog
        open={openAccessDialog}
        onClose={handleAccessDialogCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {t("Manage User Access Level")} - {user.name}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FlexBox flexDirection="column" gap={3}>
            <FormControl fullWidth>
              <InputLabel>{t("Access Level")}</InputLabel>
              <Select
                value={formData.accessLevel}
                label={t("Access Level")}
                onChange={(e) =>
                  handleFormChange("accessLevel", e.target.value)
                }
              >
                {Object.values(ACCESS_LEVELS).map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>{t("Plan Status")}</InputLabel>
              <Select
                value={formData.planStatus}
                label={t("Plan Status")}
                onChange={(e) => handleFormChange("planStatus", e.target.value)}
              >
                {Object.values(PLAN_STATUS).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label={t("Subscription End Date")}
              type="date"
              value={formData.subscriptionEnd}
              onChange={(e) =>
                handleFormChange("subscriptionEnd", e.target.value)
              }
              InputLabelProps={{
                shrink: true,
              }}
              helperText={t("Leave empty for unlimited access")}
            />

            <FlexBox
              sx={{
                p: 2,
                backgroundColor: "action.hover",
                borderRadius: 1,
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Paragraph fontWeight={600} color="primary.main">
                {t("Current Information")}:
              </Paragraph>
              <Paragraph fontSize={14}>
                {t("Current Access")}: <strong>{user.accessLevel}</strong>
              </Paragraph>
              <Paragraph fontSize={14}>
                {t("Current Status")}: <strong>{user.planStatus}</strong>
              </Paragraph>
              <Paragraph fontSize={14}>
                {t("Join Date")}: <strong>{formatDate(user.joinDate)}</strong>
              </Paragraph>
              <Paragraph fontSize={14}>
                {t("Last Login")}: <strong>{formatDate(user.lastLogin)}</strong>
              </Paragraph>
            </FlexBox>
          </FlexBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccessDialogCancel} color="primary">
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleAccessDialogSave}
            variant="contained"
            color="primary"
          >
            {t("Save Changes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
