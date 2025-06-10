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

const getAccessLevelColor = (level) => {
    // console.log({level});
// console.log({ACCESS_LEVELS});

  switch (level) {
    case ACCESS_LEVELS.FREE:
      return { color: "default", textColor: "#666" };
    case ACCESS_LEVELS.PREMIUM:
      return { color: "primary", textColor: "#1976d2" };
    case ACCESS_LEVELS.UNLIMITED:
      return { color: "secondary", textColor: "#d32f2f" };
    default:
      return { color: "default", textColor: "#666" };
  }
};

const getPlanStatusColor = (status) => {
  switch (status) {
    case PLAN_STATUS.ACTIVE:
      return { color: "success", textColor: "#2e7d32" };
    case PLAN_STATUS.TRIAL:
      return { color: "warning", textColor: "#ed6c02" };
    case PLAN_STATUS.EXPIRED:
      return { color: "error", textColor: "#d32f2f" };
    case PLAN_STATUS.INACTIVE:
      return { color: "default", textColor: "#666" };
    default:
      return { color: "default", textColor: "#666" };
  }
};

export default function UserTableRow(props) {
  const { t } = useTranslation();
  const { user, isSelected, handleSelectRow, handleDeleteUser, handleUpdateUser } = props;
  console.log(user);
  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAccessDialog, setOpenAccessDialog] = useState(false);
  
  // Form state for access level management
  const [formData, setFormData] = useState({
    accessLevel: user.accessLevel,
    planStatus: user.planStatus,
    subscriptionEnd: user.subscriptionEnd || ""
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

  const handleDeleteConfirm = () => {
    if (handleDeleteUser) {
      handleDeleteUser(user?.id);
    }
    setOpenDeleteDialog(false);
    toast.success(t("User deleted successfully"));
  };

  // Handle Access Level Management
  const handleAccessLevelManagement = () => {
    setOpenAccessDialog(true);
    handleCloseOpenMenu();
    // Reset form data when opening dialog
    setFormData({
      accessLevel: user.accessLevel,
      planStatus: user.planStatus,
      subscriptionEnd: user.subscriptionEnd || ""
    });
  };

  const handleAccessDialogCancel = () => {
    setOpenAccessDialog(false);
    // Reset form data
    setFormData({
      accessLevel: user.accessLevel,
      planStatus: user.planStatus,
      subscriptionEnd: user.subscriptionEnd || ""
    });
  };

  const handleAccessDialogSave = () => {
    if (handleUpdateUser) {
      const updatedUser = {
        ...user,
        accessLevel: formData.accessLevel,
        planStatus: formData.planStatus,
        subscriptionEnd: formData.subscriptionEnd || null
      };
      handleUpdateUser(updatedUser);
    }
    setOpenAccessDialog(false);
    toast.success(t("User access level updated successfully"));
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
        <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            checked={isSelected}
            onClick={(event) => handleSelectRow(event, user.id)}
          />
        </TableCell>

        <TableCell padding="normal">
          <FlexBox alignItems="center" gap={2}>
             
            <div>
              <Paragraph
                fontWeight={500}
                color="text.primary"
              >
                {user.device_id || "-"}
              </Paragraph>
             
            </div>
          </FlexBox>
        </TableCell>

      
 

        <TableCell padding="normal">
          <Chip
            label={user.accessLevel}
            size="small"
            sx={{
              backgroundColor: `${accessLevelStyle.textColor}15`,
              color: accessLevelStyle.textColor,
              fontWeight: 500
            }}
          />
        </TableCell>

        <TableCell padding="normal">
          <Chip
            label={user.planStatus}
            size="small"
            sx={{
              backgroundColor: `${planStatusStyle.textColor}15`,
              color: planStatusStyle.textColor,
              fontWeight: 500
            }}
          />
        </TableCell>

        <TableCell padding="normal">
          <Paragraph>{formatDate(user.lastLogin)}</Paragraph>
        </TableCell>

        <TableCell padding="normal">
          <TableMoreMenu
            open={openMenuEl}
            handleOpen={handleOpenMenu}
            handleClose={handleCloseOpenMenu}
          >
            <TableMoreMenuItem
              Icon={AdminPanelSettings}
              title={t("Manage Access")}
              handleClick={handleAccessLevelManagement}
            />
            
            {/* <TableMoreMenuItem
              Icon={Edit}
              title={t("Edit User")}
              handleClick={() => {
                handleCloseOpenMenu();
                navigate(`/user-edit/${user.id}`);
              }}
            /> */}

            <TableMoreMenuItem
              Icon={DeleteOutline}
              title={t("Delete User")}
              handleClick={handleDeleteConfirmation}
            />
          </TableMoreMenu>
        </TableCell>
      </TableRow>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>{t("Are you sure you want to delete this user?")}</DialogTitle>
        <DialogContent>
          <Paragraph>{t("This action cannot be undone.")}</Paragraph>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Access Level Management Dialog */}
      <Dialog open={openAccessDialog} onClose={handleAccessDialogCancel} maxWidth="sm" fullWidth>
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
                onChange={(e) => handleFormChange('accessLevel', e.target.value)}
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
                onChange={(e) => handleFormChange('planStatus', e.target.value)}
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
              onChange={(e) => handleFormChange('subscriptionEnd', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              helperText={t("Leave empty for unlimited access")}
            />

            <FlexBox
              sx={{ 
                p: 2, 
                backgroundColor: 'action.hover', 
                borderRadius: 1,
                flexDirection: 'column',
                gap: 1
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
          <Button onClick={handleAccessDialogSave} variant="contained" color="primary">
            {t("Save Changes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 