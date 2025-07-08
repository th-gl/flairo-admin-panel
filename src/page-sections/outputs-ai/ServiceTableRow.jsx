import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Edit from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ContentCopy from "@mui/icons-material/ContentCopy";
import PlayArrow from "@mui/icons-material/PlayArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Star from "@mui/icons-material/Star";
import FlexBox from "@/components/flexbox/FlexBox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { TextField as Textarea } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
// import Typography from "@mui/material";

import {
  PROMPT_STATUS,
  PROMPT_CATEGORIES,
  AI_MODELS_FOR_PROMPTS,
  PROMPT_COMPLEXITY,
} from "@/__fakeData__/aiPrompts";
import { alpha } from "@mui/material/styles";
import { doc, updateDoc, deleteField, deleteDoc } from "firebase/firestore";
import { DB } from "@/contexts/firebaseContext.jsx";
import { toast } from "react-toastify";
import { Grid, IconButton, Tooltip } from "@mui/material";

const getStatusColor = (status) => {
  switch (status) {
    case PROMPT_STATUS.ACTIVE:
      return { color: "success", textColor: "#2e7d32" };
    case PROMPT_STATUS.DRAFT:
      return { color: "warning", textColor: "#ed6c02" };
    case PROMPT_STATUS.TESTING:
      return { color: "info", textColor: "#0288d1" };
    case PROMPT_STATUS.ARCHIVED:
      return { color: "default", textColor: "#666" };
    case PROMPT_STATUS.DEPRECATED:
      return { color: "error", textColor: "#d32f2f" };
    default:
      return { color: "default", textColor: "#666" };
  }
};

const getCategoryColor = (category) => {
  const colors = {
    [PROMPT_CATEGORIES.CONTENT_GENERATION]: "#1976d2",
    [PROMPT_CATEGORIES.CUSTOMER_SUPPORT]: "#2e7d32",
    [PROMPT_CATEGORIES.DATA_ANALYSIS]: "#ed6c02",
    [PROMPT_CATEGORIES.CODE_GENERATION]: "#9c27b0",
    [PROMPT_CATEGORIES.TRANSLATION]: "#d32f2f",
    [PROMPT_CATEGORIES.SUMMARIZATION]: "#0288d1",
    [PROMPT_CATEGORIES.CLASSIFICATION]: "#795548",
    [PROMPT_CATEGORIES.CREATIVE_WRITING]: "#e91e63",
    [PROMPT_CATEGORIES.PRODUCT_DESCRIPTION]: "#ff9800",
    [PROMPT_CATEGORIES.EMAIL_GENERATION]: "#607d8b",
  };
  return colors[category] || "#666";
};

export default function ServiceTableRow(props) {
  console.log("props", props);

  const { t } = useTranslation();
  const {
    user,
    prompt,
    isSelected,
    handleSelectRow,
    handleDeleteService,
    fetchAIPrompts,
    handleEdit,
    setOpenAddDialo,
  } = props;
  console.log("userrr prompt output data", user);
  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openTestDialog, setOpenTestDialog] = useState(false);

  const handleOpenMenu = (event) => {
    setOpenMenuEl(event.currentTarget);
  };

  const handleCloseOpenMenu = () => setOpenMenuEl(null);

  // Delete confirmation
  const handleDeleteConfirmation = () => {
    setOpenDialog(true);
    handleCloseOpenMenu();
  };

  const handleDeleteConfirm = async (userId) => {
    console.log("userId", userId);

    try {
      const userRef = doc(DB, "aiPrompts", userId); // 'react' is the collection name
      await deleteDoc(userRef);
      toast.success(t("Prompt deleted successfully"));
      setOpenDialog(false);
      await fetchAIPrompts();
    } catch (error) {
      console.error("Error deleting user: ", error);
      throw error;
    }
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  // View details
  const handleViewDetails = () => {
    console.log("AI prompt");
    fetchAIPrompts();
    setOpenDetailDialog(true);
    handleCloseOpenMenu();
  };

  const handleDetailDialogClose = () => {
    setOpenDetailDialog(false);
  };

  // Edit prompt
  const handleEditPrompt = () => {
    setOpenAddDialog(true);
    handleCloseOpenMenu();
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  // Test prompt
  const handleTestPrompt = () => {
    setOpenTestDialog(true);
    handleCloseOpenMenu();
  };

  const handleTestDialogClose = () => {
    setOpenTestDialog(false);
  };

  // Duplicate prompt
  const handleDuplicatePrompt = () => {
    // Implementation for duplicating prompt
    handleCloseOpenMenu();
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "-";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const statusStyle = getStatusColor(prompt?.status);
  const categoryColor = getCategoryColor(prompt?.category);

  return (
    <>
      <TableRow hover selected={isSelected}>
        <TableCell padding="normal">
          <FlexBox alignItems="center" gap={2}>
            <div>
              <Paragraph fontWeight={500} color="text.primary">
                {user?.uid || "-"}
              </Paragraph>
            </div>
          </FlexBox>
        </TableCell>
        <TableCell>
          <Paragraph>
            {user?.timestamp
              ? `${new Date(
                  user.timestamp.seconds * 1000 +
                    user.timestamp.nanoseconds / 1e6
                ).toLocaleTimeString()} - ${
                  new Date(
                    user.timestamp.seconds * 1000 +
                      user.timestamp.nanoseconds / 1e6
                  )
                    .toISOString()
                    .split("T")[0]
                }`
              : "-"}
          </Paragraph>
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
              Icon={Edit}
              title={t("Edit Prompt")}
             handleClick={() => handleEdit(user)} 
            /> */}

            {/* <TableMoreMenuItem
              Icon={DeleteOutline}
              title={t("Delete")}
              handleClick={handleDeleteConfirmation}
            /> */}
          </TableMoreMenu>
        </TableCell>
      </TableRow>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          {t("Confirm Delete")}
        </DialogTitle>
        <DialogContent>
          <Paragraph>
            {t("Are you sure you want to delete")} "{prompt?.name}"?
            {t("This action cannot be undone.")}
          </Paragraph>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            {t("Cancel")}
          </Button>
          <Button
            onClick={() => handleDeleteConfirm(user.id)}
            color="error"
            variant="contained"
          >
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDetailDialog}
        onClose={handleDetailDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{t("Output Prompt Details")}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <DialogContent>
              {user.response &&
                Object.entries(
                  typeof user.response === "string"
                    ? JSON.parse(user.response)
                    : user.response
                ).map(([key, section]) => (
                  <Box key={key} mb={3}>
                    <Paragraph
                      variant="subtitle2"
                      sx={{ color: "gray", mb: 1 }}
                    >
                      {section.title || key}
                    </Paragraph>
                    <Box
                      sx={{
                        backgroundColor: "#f5f5f5",
                        padding: "12px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      <Paragraph variant="body2">
                        {section.text || JSON.stringify(section, null, 2)}
                      </Paragraph>
                    </Box>
                  </Box>
                ))}
            </DialogContent>
          </Box>
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
