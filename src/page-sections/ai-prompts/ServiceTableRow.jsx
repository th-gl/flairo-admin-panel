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
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { PROMPT_STATUS, PROMPT_CATEGORIES, AI_MODELS_FOR_PROMPTS, PROMPT_COMPLEXITY } from "@/__fakeData__/aiPrompts";
import { alpha } from "@mui/material/styles";

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
    [PROMPT_CATEGORIES.EMAIL_GENERATION]: "#607d8b"
  };
  return colors[category] || "#666";
};

export default function ServiceTableRow(props) {
  const { t } = useTranslation();
  const { user: prompt, isSelected, handleSelectRow, handleDeleteService } = props;
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

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  const handleDeleteConfirm = () => {
    handleDeleteService(prompt?.id);
    setOpenDialog(false);
  };

  // View details
  const handleViewDetails = () => {
    setOpenDetailDialog(true);
    handleCloseOpenMenu();
  };

  const handleDetailDialogClose = () => {
    setOpenDetailDialog(false);
  };

  // Edit prompt
  const handleEditPrompt = () => {
    setOpenEditDialog(true);
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
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const statusStyle = getStatusColor(prompt?.status);
  const categoryColor = getCategoryColor(prompt?.category);

  return (
    <>
      <TableRow 
        hover
        selected={isSelected}
        sx={{
          '&.Mui-selected': {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
            },
          },
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            checked={isSelected}
            onClick={(event) => handleSelectRow(event, prompt.id)}
            sx={{
              '&.Mui-checked': {
                color: 'primary.main',
              },
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              },
            }}
          />
        </TableCell>

        {/* Prompt Name */}
        <TableCell padding="normal">
          <FlexBox alignItems="center" gap={2}>
            <div>
              <Paragraph fontWeight={500} color="text.primary">
                {prompt?.name || "-"}
              </Paragraph>
              <Paragraph fontSize={12} color="text.secondary">
                {truncateText(prompt?.description)}
              </Paragraph>
            </div>
          </FlexBox>
        </TableCell>

        {/* Category */}
        <TableCell padding="normal">
          <Chip
            label={prompt?.category || "Uncategorized"}
            size="small"
            sx={{
              backgroundColor: `${categoryColor}15`,
              color: categoryColor,
              fontWeight: 500
            }}
          />
        </TableCell>

        {/* Status */}
        {/* <TableCell padding="normal">
          <Chip
            label={prompt?.status || "Unknown"}
            size="small"
            sx={{
              backgroundColor: `${statusStyle.textColor}15`,
              color: statusStyle.textColor,
              fontWeight: 500
            }}
          />
          {prompt?.is_current_version && (
            <Chip
              label="Current"
              size="small"
              sx={{
                ml: 1,
                backgroundColor: "#2e7d3215",
                color: "#2e7d32",
                fontWeight: 500
              }}
            />
          )}
        </TableCell> */}

        {/* Version */}
        {/* <TableCell padding="normal">
          <Paragraph fontWeight={500}>
            v{prompt?.version || "1.0"}
          </Paragraph>
          <Paragraph fontSize={12} color="text.secondary">
            {prompt?.complexity}
          </Paragraph>
        </TableCell> */}

        {/* Usage Count */}
        <TableCell padding="normal">
          <Paragraph fontWeight={500}>
            {prompt?.usage_count?.toLocaleString() || "0"}
          </Paragraph>
          <Paragraph fontSize={12} color="text.secondary">
            {prompt?.success_rate}% success
          </Paragraph>
        </TableCell>

        {/* Rating */}
        {/* <TableCell padding="normal">
          <FlexBox alignItems="center" gap={1}>
            <Rating
              size="small"
              value={parseFloat(prompt?.user_rating) || 0}
              readOnly
              precision={0.1}
            />
            <Paragraph fontSize={12} color="text.secondary">
              ({prompt?.user_rating})
            </Paragraph>
          </FlexBox>
        </TableCell> */}

        {/* Last Updated */}
        <TableCell padding="normal">
          <Paragraph fontSize={13}>
            {formatTimestamp(prompt?.updated_at)}
          </Paragraph>
          <Paragraph fontSize={12} color="text.secondary">
            by {prompt?.last_modified_by}
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
            <TableMoreMenuItem
              Icon={Edit}
              title={t("Edit Prompt")}
              handleClick={handleEditPrompt}
            />
            {/* <TableMoreMenuItem
              Icon={PlayArrow}
              title={t("Test Prompt")}
              handleClick={handleTestPrompt}
            /> */}
            {/* <TableMoreMenuItem
              Icon={ContentCopy}
              title={t("Duplicate")}
              handleClick={handleDuplicatePrompt}
            />   */}
            <TableMoreMenuItem
              Icon={DeleteOutline}
              title={t("Delete")}
              handleClick={handleDeleteConfirmation}
            />
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
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Detail View Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={handleDetailDialogClose}
        maxWidth="md"
        fullWidth
        aria-labelledby="detail-dialog-title"
      >
        <DialogTitle id="detail-dialog-title">
          {t("Prompt Details")}: {prompt?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <FlexBox gap={2} mb={2} flexWrap="wrap">
              <Chip label={`Category: ${prompt?.category}`} />
              <Chip label={`Status: ${prompt?.status}`} />
              <Chip label={`Version: v${prompt?.version}`} />
              <Chip label={`Model: ${prompt?.recommended_model}`} />
              <Chip label={`Complexity: ${prompt?.complexity}`} />
            </FlexBox>
            
            <Paragraph variant="subtitle2" mb={1} fontWeight={600}>
              {t("Description")}:
            </Paragraph>
            <Paragraph mb={2}>{prompt?.description}</Paragraph>

            <Paragraph variant="subtitle2" mb={1} fontWeight={600}>
              {t("Prompt Template")}:
            </Paragraph>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                padding: 2,
                borderRadius: 1,
                mb: 2,
                fontFamily: "monospace",
                whiteSpace: "pre-wrap"
              }}
            >
              {prompt?.prompt_text}
            </Box>

            <Paragraph variant="subtitle2" mb={1} fontWeight={600}>
              {t("Variables")}:
            </Paragraph>
            <FlexBox gap={1} mb={2} flexWrap="wrap">
              {prompt?.variables?.map((variable, index) => (
                <Chip
                  key={index}
                  label={`{${variable}}`}
                  size="small"
                  variant="outlined"
                />
              ))}
            </FlexBox>

            <Divider sx={{ my: 2 }} />

            {/* <Paragraph variant="subtitle2" mb={1} fontWeight={600}>
              {t("Performance Metrics")}:
            </Paragraph>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Box>
                <Paragraph fontSize={12} color="text.secondary">Usage Count</Paragraph>
                <Paragraph fontWeight={500}>{prompt?.usage_count?.toLocaleString()}</Paragraph>
              </Box>
              <Box>
                <Paragraph fontSize={12} color="text.secondary">Success Rate</Paragraph>
                <Paragraph fontWeight={500}>{prompt?.success_rate}%</Paragraph>
              </Box>
              <Box>
                <Paragraph fontSize={12} color="text.secondary">Avg Response Time</Paragraph>
                <Paragraph fontWeight={500}>{prompt?.avg_response_time}ms</Paragraph>
              </Box>
              <Box>
                <Paragraph fontSize={12} color="text.secondary">User Rating</Paragraph>
                <FlexBox alignItems="center" gap={1}>
                  <Rating
                    size="small"
                    value={parseFloat(prompt?.user_rating)}
                    readOnly
                    precision={0.1}
                  />
                  <Paragraph>({prompt?.user_rating})</Paragraph>
                </FlexBox>
              </Box>
            </Box> */}

            {/* <Divider sx={{ my: 2 }} />

            <Paragraph variant="subtitle2" mb={1} fontWeight={600}>
              {t("Tags & Use Cases")}:
            </Paragraph>
            <FlexBox gap={1} mb={2} flexWrap="wrap">
              {prompt?.tags?.map((tag, index) => (
                <Chip key={index} label={tag} size="small" color="primary" />
              ))}
            </FlexBox>
            <FlexBox gap={1} flexWrap="wrap">
              {prompt?.use_cases?.map((useCase, index) => (
                <Chip key={index} label={useCase} size="small" variant="outlined" />
              ))}
            </FlexBox> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailDialogClose} color="inherit">
            {t("Close")}
          </Button>
          <Button onClick={handleEditPrompt} variant="contained">
            {t("Edit Prompt")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Prompt Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditDialogClose}
        maxWidth="lg"
        fullWidth
        aria-labelledby="edit-dialog-title"
      >
        <DialogTitle id="edit-dialog-title">
          {t("Edit Prompt")}: {prompt?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label={t("Prompt Name")}
              defaultValue={prompt?.name}
              margin="normal"
            />
            <TextField
              fullWidth
              label={t("Description")}
              defaultValue={prompt?.description}
              margin="normal"
              multiline
              rows={2}
            />
            <TextField
              fullWidth
              label={t("Prompt Template")}
              defaultValue={prompt?.prompt_text}
              margin="normal"
              multiline
              rows={8}
              sx={{ fontFamily: "monospace" }}
            />
            {/* <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, mt: 2 }}>
              <TextField
                select
                label={t("Category")}
                defaultValue={prompt?.category}
                SelectProps={{ native: true }}
              >
                {Object.values(PROMPT_CATEGORIES).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </TextField>
              <TextField
                select
                label={t("Status")}
                defaultValue={prompt?.status}
                SelectProps={{ native: true }}
              >
                {Object.values(PROMPT_STATUS).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </TextField>
              <TextField
                select
                label={t("Recommended Model")}
                defaultValue={prompt?.recommended_model}
                SelectProps={{ native: true }}
              >
                {Object.values(AI_MODELS_FOR_PROMPTS).map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </TextField>
            </Box> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="inherit">
            {t("Cancel")}
          </Button>
          <Button variant="contained" color="primary">
            {t("Save Changes")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Test Prompt Dialog */}
      <Dialog
        open={openTestDialog}
        onClose={handleTestDialogClose}
        maxWidth="md"
        fullWidth
        aria-labelledby="test-dialog-title"
      >
        <DialogTitle id="test-dialog-title">
          {t("Test Prompt")}: {prompt?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Paragraph variant="subtitle2" mb={2} fontWeight={600}>
              {t("Fill in the variables to test this prompt")}:
            </Paragraph>
            {prompt?.variables?.map((variable, index) => (
              <TextField
                key={index}
                fullWidth
                label={variable}
                placeholder={`Enter value for ${variable}`}
                margin="normal"
              />
            ))}
            <Box sx={{ mt: 3, mb: 2 }}>
              <Paragraph variant="subtitle2" mb={1} fontWeight={600}>
                {t("Generated Prompt")}:
              </Paragraph>
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  padding: 2,
                  borderRadius: 1,
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  maxHeight: 200,
                  overflow: "auto"
                }}
              >
                {prompt?.prompt_text}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTestDialogClose} color="inherit">
            {t("Close")}
          </Button>
          <Button variant="contained" color="primary">
            {t("Run Test")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
