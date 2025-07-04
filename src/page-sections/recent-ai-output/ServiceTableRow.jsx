import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Edit from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlagIcon from "@mui/icons-material/Flag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import { DB } from "@/contexts/firebaseContext.jsx";
import { collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc, } from "firebase/firestore"; 
  import { toast } from "react-toastify";
import { OUTPUT_STATUS, AI_MODELS, CONFIDENCE_LEVELS } from "@/__fakeData__/aiOutputs";

const getStatusColor = (status) => {
  switch (status) {
    case OUTPUT_STATUS.SUCCESS:
      return { color: "success", textColor: "#2e7d32" };
    case OUTPUT_STATUS.PARTIAL_SUCCESS:
      return { color: "warning", textColor: "#ed6c02" };
    case OUTPUT_STATUS.ERROR:
      return { color: "error", textColor: "#d32f2f" };
    case OUTPUT_STATUS.TIMEOUT:
      return { color: "error", textColor: "#d32f2f" };
    case OUTPUT_STATUS.PROCESSING:
      return { color: "info", textColor: "#0288d1" };
    case OUTPUT_STATUS.QUEUED:
      return { color: "default", textColor: "#666" };
    default:
      return { color: "default", textColor: "#666" };
  }
};

const getModelColor = (model) => {
  switch (model) {
    case AI_MODELS.GPT4:
      return { 
        backgroundColor: "#dbeafe", 
        textColor: "#1d4ed8",
        borderColor: "#3b82f6"
      };
    case AI_MODELS.GPT35:
      return { 
        backgroundColor: "#e0f2fe", 
        textColor: "#0277bd",
        borderColor: "#29b6f6"
      };
    case AI_MODELS.CLAUDE:
      return { 
        backgroundColor: "#f3e8ff", 
        textColor: "#7c3aed",
        borderColor: "#a855f7"
      };
    case AI_MODELS.LLAMA:
      return { 
        backgroundColor: "#dcfce7", 
        textColor: "#166534",
        borderColor: "#22c55e"
      };
    default:
      return { 
        backgroundColor: "#f3f4f6", 
        textColor: "#6b7280",
        borderColor: "#d1d5db"
      };
  }
};

const getConfidenceColor = (score) => {
  if (score >= 80) return { color: "success", textColor: "#2e7d32" };
  if (score >= 60) return { color: "warning", textColor: "#ed6c02" };
  return { color: "error", textColor: "#d32f2f" };
};

export default function ServiceTableRow(props) {
  console.log('props',props)
  const { t } = useTranslation();
  const { user: output, isSelected, handleSelectRow, handleDeleteService ,fetchUsers} = props;

  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openQADialog, setOpenQADialog] = useState(false);




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
    const handleDeleteConfirm = async (userId) => {
      console.log("userdddId", userId);
  
      try {
        const userRef = doc(DB, "users", userId); // 'react' is the collection name
        await deleteDoc(userRef);
        toast.success(t("User deleted successfully"));
        setOpenDialog(false);
        await fetchUsers();
      } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
      }
    };
  // View details
  const handleViewDetails = () => {
    setOpenDetailDialog(true);
    handleCloseOpenMenu();
  };

  const handleDetailDialogClose = () => {
    setOpenDetailDialog(false);
  };

  // QA Review
  const handleQAReview = () => {
    setOpenQADialog(true);
    handleCloseOpenMenu();
  };

  const handleQADialogClose = () => {
    setOpenQADialog(false);
  };

  // Flag for review
  const handleFlagForReview = () => {
    // Implementation for flagging output for review
    handleCloseOpenMenu();
  };
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

  const formatProcessingTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "-";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const statusStyle = getStatusColor(output?.status);
  const modelStyle = getModelColor(output?.ai_model);
  const confidenceStyle = getConfidenceColor(output?.confidence_score)

  return (
    <>
      <TableRow hover>
        {/* <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            checked={isSelected}
            onClick={(event) => handleSelectRow(event, output.id)}
          />
        </TableCell> */}

        {/* User */}
        <TableCell padding="normal">
          <FlexBox alignItems="center" gap={2}>
         
            <div>
              <Paragraph fontWeight={500} color="text.primary">
                {output?.deviceId || "-"}
              </Paragraph>
              {/* <Paragraph fontSize={12} color="text.secondary">
                {formatTimestamp(output?.timestamp)}
              </Paragraph> */}
            </div>
          </FlexBox>
        </TableCell>

        {/* Output Type */}
        <TableCell padding="normal">
          <Paragraph fontWeight={500}>
            {output?.deviceModel || "-"}
          </Paragraph>
       
        </TableCell>
            <TableCell padding="normal">
          <Paragraph fontWeight={500}>
            {output?.platform || "-"}
          </Paragraph>
       
        </TableCell>
            <TableCell padding="normal">
          <Paragraph fontWeight={500}>
            {output?.osVersion || "-"}
          </Paragraph>
       
        </TableCell>
           <TableCell padding="normal">
                  <Paragraph>
                    {output?.lastLogin instanceof Date
                      ? `${output.lastLogin.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })} - ${output.lastLogin.toLocaleDateString("en-GB")}`
                      : "Never"}
                  </Paragraph>
                </TableCell>

     

        {/* Status */}
        {/* <TableCell padding="normal">
          <Chip
            label={output?.status || "Unknown"}
            size="small"
            sx={{
              backgroundColor: `${statusStyle.textColor}15`,
              color: statusStyle.textColor,
              fontWeight: 500
            }}
          />
          {output?.error_code && (
            <Paragraph fontSize={11} color="error.main" sx={{ mt: 0.5 }}>
              {output.error_code}
            </Paragraph>
          )}
        </TableCell> */}

        {/* Processing Time */}
        {/* <TableCell padding="normal">
          <Paragraph fontWeight={500}>
            {formatProcessingTime(output?.processing_time_ms || 0)}
          </Paragraph>
          <Paragraph fontSize={12} color="text.secondary">
            {output?.token_count || 0} tokens
          </Paragraph>
        </TableCell> */}

        {/* Confidence */}
        {/* <TableCell padding="normal">
          <Paragraph
            fontWeight={500}
            sx={{ color: confidenceStyle.textColor }}
          >
            {output?.confidence_score || 0}%
          </Paragraph>
          <Paragraph fontSize={12} color="text.secondary">
            {output?.confidence_level || "Unknown"}
          </Paragraph>
        </TableCell> */}

        {/* QA Status */}
        {/* <TableCell padding="normal">
          <FlexBox alignItems="center" gap={1}>
            {output?.qa_reviewed ? (
              <>
                <CheckCircleIcon sx={{ color: "success.main", fontSize: 16 }} />
                <div>
                  <Paragraph fontSize={13} color="success.main">
                    {t("Reviewed")}
                  </Paragraph>
                  {output?.qa_rating && (
                    <Rating
                      value={output.qa_rating}
                      size="small"
                      readOnly
                      sx={{ fontSize: 12 }}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                {output?.flagged_for_review ? (
                  <FlagIcon sx={{ color: "warning.main", fontSize: 16 }} />
                ) : null}
                <Paragraph fontSize={13} color="text.secondary">
                  {output?.flagged_for_review ? t("Flagged") : t("Pending")}
                </Paragraph>
              </>
            )}
          </FlexBox>
        </TableCell> */}

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
              Icon={CheckCircleIcon}
              title={t("QA Review")}
              handleClick={handleQAReview}
            />

            <TableMoreMenuItem
              Icon={FlagIcon}
              title={t("Flag for Review")}
              handleClick={handleFlagForReview}
            /> */}

            {/* <TableMoreMenuItem
              Icon={Edit}
              title={t("Edit")}
              handleClick={() => {
                handleCloseOpenMenu();
                navigate(`/ai-output-edit/${output.id}`);
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
        <DialogTitle>{t("Delete AI Output Record?")}</DialogTitle>
        <DialogContent>
          <Paragraph>{t("This action cannot be undone. The AI output record will be permanently removed.")}</Paragraph>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={()=>handleDeleteConfirm(output.id)} color="error">
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Output Detail Dialog */}
      <Dialog open={openDetailDialog} onClose={handleDetailDialogClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          {t("User Activity Detail")} - {output?.output_type}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Basic Info */}
            <Box>
              <Paragraph variant="h6" gutterBottom>{t("Basic Information")}</Paragraph>
              <FlexBox flexDirection="column" gap={1}>
                <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Device Id")}:</Paragraph>
                  <Paragraph>{output?.deviceId}</Paragraph>
                </FlexBox>
                <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Device Model")}:</Paragraph>
                  <Paragraph>{output?.deviceModel}</Paragraph>
                </FlexBox>
                <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Created At")}:</Paragraph>
                  <Paragraph>{formatTimestamp(output?.createdAt)}</Paragraph>
                </FlexBox>
                 
                <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Version")}:</Paragraph>
                  <Paragraph>{output?.osVersion}</Paragraph>
                </FlexBox>
                 <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Platform")}:</Paragraph>
                  <Paragraph>{output?.platform}</Paragraph>
                </FlexBox>
              </FlexBox>
            </Box>

    

            {/* Performance Metrics */}
            {/* <Box>
              <Paragraph variant="h6" gutterBottom>{t("Performance Metrics")}</Paragraph>
              <FlexBox flexDirection="column" gap={1}>
                <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Processing Time")}:</Paragraph>
                  <Paragraph>{formatProcessingTime(output?.processing_time_ms)}</Paragraph>
                </FlexBox>
                <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Token Count")}:</Paragraph>
                  <Paragraph>{output?.token_count}</Paragraph>
                </FlexBox>
                <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Confidence Score")}:</Paragraph>
                  <Paragraph>{output?.confidence_score}%</Paragraph>
                </FlexBox>
                <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Cost")}:</Paragraph>
                  <Paragraph>${output?.cost_usd}</Paragraph>
                </FlexBox>
              </FlexBox>
            </Box>

            <Divider /> */}

            {/* Safety & Quality Scores */}
            {/* <Box>
              <Paragraph variant="h6" gutterBottom>{t("Safety & Quality")}</Paragraph>
              <FlexBox flexDirection="column" gap={1}>
                <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Safety Score")}:</Paragraph>
                  <Paragraph color={output?.safety_score > 80 ? "success.main" : "warning.main"}>
                    {output?.safety_score}/100
                  </Paragraph>
                </FlexBox>
                <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Toxicity Score")}:</Paragraph>
                  <Paragraph color={output?.toxicity_score < 10 ? "success.main" : "error.main"}>
                    {output?.toxicity_score}/100
                  </Paragraph>
                </FlexBox>
                <FlexBox justifyContent="space-between">
                  <Paragraph fontWeight={600}>{t("Bias Score")}:</Paragraph>
                  <Paragraph>{output?.bias_score}/100</Paragraph>
                </FlexBox>
                {output?.bleu_score && (
                  <FlexBox justifyContent="space-between">
                    <Paragraph fontWeight={600}>{t("BLEU Score")}:</Paragraph>
                    <Paragraph>{output?.bleu_score}</Paragraph>
                  </FlexBox>
                )}
              </FlexBox>
            </Box> */}

            {/* QA Information */}
            {/* {(output?.qa_reviewed || output?.qa_notes) && (
              <>
                <Divider />
                <Box>
                  <Paragraph variant="h6" gutterBottom>{t("QA Review")}</Paragraph>
                  <FlexBox flexDirection="column" gap={1}>
                    {output?.qa_reviewer && (
                      <FlexBox justifyContent="space-between">
                        <Paragraph fontWeight={600}>{t("Reviewer")}:</Paragraph>
                        <Paragraph>{output?.qa_reviewer}</Paragraph>
                      </FlexBox>
                    )}
                    {output?.qa_rating && (
                      <FlexBox justifyContent="space-between">
                        <Paragraph fontWeight={600}>{t("Rating")}:</Paragraph>
                        <Rating value={output?.qa_rating} size="small" readOnly />
                      </FlexBox>
                    )}
                    {output?.qa_notes && (
                      <Box>
                        <Paragraph fontWeight={600} gutterBottom>{t("Notes")}:</Paragraph>
                        <Paragraph fontSize={14}>{output?.qa_notes}</Paragraph>
                      </Box>
                    )}
                  </FlexBox>
                </Box>
              </>
            )} */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailDialogClose} color="primary">
            {t("Close")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* QA Review Dialog */}
      <Dialog open={openQADialog} onClose={handleQADialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t("QA Review")} - {output?.user_name}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FlexBox flexDirection="column" gap={2}>
            <Box>
              <Paragraph fontWeight={600} gutterBottom>{t("Current QA Status")}:</Paragraph>
              <Paragraph color={output?.qa_reviewed ? "success.main" : "text.secondary"}>
                {output?.qa_reviewed ? t("Reviewed") : t("Pending Review")}
              </Paragraph>
            </Box>
            
            {output?.qa_rating && (
              <Box>
                <Paragraph fontWeight={600} gutterBottom>{t("Current Rating")}:</Paragraph>
                <Rating value={output?.qa_rating} readOnly />
              </Box>
            )}

            <Box>
              <Paragraph fontWeight={600} gutterBottom>{t("Output Quality")}:</Paragraph>
              <Box sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
                <Paragraph fontSize={14}>
                  {truncateText(output?.output_text, 200)}
                </Paragraph>
              </Box>
            </Box>

            {output?.human_feedback && (
              <Box>
                <Paragraph fontWeight={600} gutterBottom>{t("Human Feedback")}:</Paragraph>
                <Paragraph fontSize={14}>{output?.human_feedback}</Paragraph>
              </Box>
            )}
          </FlexBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleQADialogClose} color="primary">
            {t("Close")}
          </Button>
          <Button variant="contained" color="primary">
            {t("Update QA Status")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
