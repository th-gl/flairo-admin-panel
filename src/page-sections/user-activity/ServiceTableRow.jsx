import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Edit from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import FlexBox from "@/components/flexbox/FlexBox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { FLOW_BEHAVIOR, DEVICE_STATUS } from "@/__fakeData__/userActivity";

const getFlowBehaviorColor = (behavior) => {
  switch (behavior) {
    case FLOW_BEHAVIOR.NORMAL:
      return { 
        backgroundColor: "#dcfce7", 
        textColor: "#166534",
        borderColor: "#22c55e"
      };
    case FLOW_BEHAVIOR.SUSPICIOUS:
      return { 
        backgroundColor: "#fee2e2", 
        textColor: "#dc2626",
        borderColor: "#ef4444"
      };
    case FLOW_BEHAVIOR.HIGH_USAGE:
      return { 
        backgroundColor: "#fef3c7", 
        textColor: "#92400e",
        borderColor: "#f59e0b"
      };
    case FLOW_BEHAVIOR.IDLE:
      return { 
        backgroundColor: "#f3f4f6", 
        textColor: "#4b5563",
        borderColor: "#9ca3af"
      };
    case FLOW_BEHAVIOR.PEAK:
      return { 
        backgroundColor: "#dbeafe", 
        textColor: "#1d4ed8",
        borderColor: "#3b82f6"
      };
    default:
      return { 
        backgroundColor: "#f3f4f6", 
        textColor: "#6b7280",
        borderColor: "#d1d5db"
      };
  }
};

const getDeviceStatusColor = (status) => {
  switch (status) {
    case DEVICE_STATUS.ACTIVE:
      return { color: "success", textColor: "#2e7d32" };
    case DEVICE_STATUS.INACTIVE:
      return { color: "default", textColor: "#666" };
    case DEVICE_STATUS.BLOCKED:
      return { color: "error", textColor: "#d32f2f" };
    case DEVICE_STATUS.MONITORING:
      return { color: "warning", textColor: "#ed6c02" };
    default:
      return { color: "default", textColor: "#666" };
  }
};

export default function ServiceTableRow(props) {
  const { t } = useTranslation();
  const { user: activity, isSelected, handleSelectRow, handleDeleteService } = props;
  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const handleOpenMenu = (event) => {
    setOpenMenuEl(event.currentTarget);
  };

  const handleCloseOpenMenu = () => setOpenMenuEl(null);

  // Handle Delete Confirmation
  const handleDeleteConfirmation = () => {
    setOpenDialog(true);
    handleCloseOpenMenu();
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  const handleDeleteConfirm = () => {
    handleDeleteService(activity?.id);
    setOpenDialog(false);
  };

  // Handle View Details
  const handleViewDetails = () => {
    setOpenDetailDialog(true);
    handleCloseOpenMenu();
  };

  const handleDetailDialogClose = () => {
    setOpenDetailDialog(false);
  };

  // Handle Block/Unblock Device
  const handleToggleBlockDevice = () => {
    // Implementation for blocking/unblocking device
    handleCloseOpenMenu();
    // You can add your block/unblock logic here
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const flowBehaviorStyle = getFlowBehaviorColor(activity?.flow_behavior);
  const deviceStatusStyle = getDeviceStatusColor(activity?.status);

  return (
    <>
      <TableRow hover>
        {/* <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            checked={isSelected}
            onClick={(event) => handleSelectRow(event, activity.id)}
          />
        </TableCell> */}

        {/* Device ID */}
        <TableCell padding="normal">
          <FlexBox alignItems="center" gap={2}>
            <div>
              <Paragraph fontWeight={500} color="text.primary">
                {activity?.device_id || "-"}
              </Paragraph>
          
            </div>
          </FlexBox>
        </TableCell>

        {/* Frequency */}
        <TableCell padding="normal">
          <Paragraph fontWeight={500}>
            {activity?.frequency || 0}
          </Paragraph>
       
        </TableCell>

        {/* Time Stamps */}
        <TableCell padding="normal">
          <Paragraph fontSize={14}>
            {formatTimestamp(activity?.timestamp)}
          </Paragraph>
          <Paragraph fontSize={12} color="text.secondary">
            {activity?.activity_type || "Unknown"}
          </Paragraph>
        </TableCell>

        {/* Flow Behavior */}
        <TableCell padding="normal">
          <Chip
            label={activity?.flow_behavior || "Unknown"}
            size="small"
            sx={{
              backgroundColor: flowBehaviorStyle.backgroundColor,
              color: flowBehaviorStyle.textColor,
              border: `1px solid ${flowBehaviorStyle.borderColor}`,
              fontWeight: 600,
              fontSize: '0.75rem',
              height: '28px',
              '& .MuiChip-label': {
                px: 1.5,
              }
            }}
          />
          {activity?.risk_score !== undefined && (
            <Paragraph fontSize={12} color="text.secondary" sx={{ mt: 0.5 }}>
              {t("Risk")}: {activity.risk_score}%
            </Paragraph>
          )}
        </TableCell>

        {/* Actions */}
        <TableCell padding="normal">
          <TableMoreMenu
            open={openMenuEl}
            handleOpen={handleOpenMenu}
            handleClose={handleCloseOpenMenu}
          >
            <TableMoreMenuItem
              Icon={VisibilityIcon}
              title={t("View Details")}
              handleClick={handleViewDetails}
            />

            {/* <TableMoreMenuItem
              Icon={BlockIcon}
              title={activity?.status === DEVICE_STATUS.BLOCKED ? t("Unblock Device") : t("Block Device")}
              handleClick={handleToggleBlockDevice}
            /> */}

            {/* <TableMoreMenuItem
              Icon={Edit}
              title={t("Edit")}
              handleClick={() => {
                handleCloseOpenMenu();
                navigate(`/user-activity-edit/${activity.id}`);
              }}
            /> */}

            <TableMoreMenuItem
              Icon={DeleteOutline}
              title={t("Delete")}
              handleClick={handleDeleteConfirmation}
            />
          </TableMoreMenu>
        </TableCell>
      </TableRow>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>{t("Are you sure you want to delete this activity record?")}</DialogTitle>
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

      {/* Activity Detail Dialog */}
      <Dialog open={openDetailDialog} onClose={handleDetailDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {t("Activity Details")} - {activity?.device_id}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FlexBox flexDirection="column" gap={2}>
            <FlexBox justifyContent="space-between">
              <Paragraph fontWeight={600}>{t("User")}:</Paragraph>
              <Paragraph>{activity?.user_name}</Paragraph>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Paragraph fontWeight={600}>{t("Activity Type")}:</Paragraph>
              <Paragraph>{activity?.activity_type}</Paragraph>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Paragraph fontWeight={600}>{t("IP Address")}:</Paragraph>
              <Paragraph>{activity?.ip_address}</Paragraph>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Paragraph fontWeight={600}>{t("Location")}:</Paragraph>
              <Paragraph>{activity?.location}</Paragraph>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Paragraph fontWeight={600}>{t("Browser")}:</Paragraph>
              <Paragraph>{activity?.browser}</Paragraph>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Paragraph fontWeight={600}>{t("Operating System")}:</Paragraph>
              <Paragraph>{activity?.os}</Paragraph>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Paragraph fontWeight={600}>{t("Session Duration")}:</Paragraph>
              <Paragraph>{formatDuration(activity?.session_duration || 0)}</Paragraph>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Paragraph fontWeight={600}>{t("Pages Visited")}:</Paragraph>
              <Paragraph>{activity?.pages_visited}</Paragraph>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Paragraph fontWeight={600}>{t("Actions Performed")}:</Paragraph>
              <Paragraph>{activity?.actions_performed}</Paragraph>
            </FlexBox>
            <FlexBox justifyContent="space-between">
              <Paragraph fontWeight={600}>{t("Risk Score")}:</Paragraph>
              <Paragraph color={activity?.risk_score > 70 ? "error.main" : activity?.risk_score > 40 ? "warning.main" : "success.main"}>
                {activity?.risk_score}%
              </Paragraph>
            </FlexBox>
          </FlexBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailDialogClose} color="primary">
            {t("Close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
