import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Edit from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import ContentCopy from "@mui/icons-material/ContentCopy";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import TrendingUpOutlined from "@mui/icons-material/TrendingUpOutlined";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";
import FlexBox from "@/components/flexbox/FlexBox";
import { Paragraph, Small } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { DB } from "@/contexts/firebaseContext.jsx";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  PLAN_STATUS,
  BILLING_CYCLES,
  DECODE_LIMIT_PRESETS,
  BUTTON_TEXT_TEMPLATES,
  FEATURE_TEMPLATES,
} from "@/__fakeData__/subscriptionPlans";

export default function ServiceTableRow(props) {
  console.log("props", props);
  const { t } = useTranslation();
  const {
    plan,
    isSelected,
    handleSelectRow,
    handleDeletePlan,
    handleUpdatePlan,
    fetchPlans,
    handleEditPlan,
  } = props;
  console.log("plan", plan);
  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDecodeDialog, setOpenDecodeDialog] = useState(false);
  const [openAnalyticsDialog, setOpenAnalyticsDialog] = useState(false);

  // // Form states for editing
  // const [editForm, setEditForm] = useState({
  //   name: plan?.name || '',
  //   description: plan?.description || '',
  //   longDescription: plan?.longDescription || '',
  //   price: plan?.price || 0,
  //   weeklyDecodeLimit: plan?.weeklyDecodeLimit || 0,
  //   monthlyDecodeLimit: plan?.monthlyDecodeLimit || 0,
  //   buttonText: plan?.buttonText || '',
  //   buttonSubtext: plan?.buttonSubtext || '',
  //   status: plan?.status || PLAN_STATUS.DRAFT,
  //   billingCycle: plan?.billingCycle || BILLING_CYCLES.MONTHLY,
  //   features: plan?.features || []
  // });

  const handleOpenMenu = (event) => {
    setOpenMenuEl(event.currentTarget);
  };

  const handleCloseOpenMenu = () => setOpenMenuEl(null);

  // Delete handlers
  const handleDeleteConfirmation = () => {
    setOpenDeleteDialog(true);
    handleCloseOpenMenu();
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditClick = () => {
    handleEditPlan(plan);
    handleCloseOpenMenu();
  };

  const handleDeleteConfirm = async (userId) => {
    try {
      const userRef = doc(DB, "subscription", userId); // 'react' is the collection name
      await deleteDoc(userRef);
      toast.success(t("Plan deleted successfully"));
      setOpenDeleteDialog(false);
      await fetchPlans();
    } catch (error) {
      console.error("Error deleting Plan: ", error);
      throw error;
    }
  };

  // // View handlers
  // const handleViewDetails = () => {
  //   setOpenViewDialog(true);
  //   handleCloseOpenMenu();
  // };

  // // Edit handlers
  // const handleEditPlan = () => {
  //   setEditForm({
  //     name: plan?.name || '',
  //     description: plan?.description || '',
  //     longDescription: plan?.longDescription || '',
  //     price: plan?.price || 0,
  //     weeklyDecodeLimit: plan?.weeklyDecodeLimit || 0,
  //     monthlyDecodeLimit: plan?.monthlyDecodeLimit || 0,
  //     buttonText: plan?.buttonText || '',
  //     buttonSubtext: plan?.buttonSubtext || '',
  //     status: plan?.status || PLAN_STATUS.DRAFT,
  //     billingCycle: plan?.billingCycle || BILLING_CYCLES.MONTHLY,
  //     features: plan?.features || []
  //   });
  //   setOpenEditDialog(true);
  //   handleCloseOpenMenu();
  // };

  // const handleFormChange = (field, value) => {
  //   setEditForm(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };

  // const handleSaveChanges = () => {
  //   const updatedPlan = {
  //     ...plan,
  //     ...editForm,
  //     updatedAt: new Date().toISOString(),
  //     lastModifiedBy: 'Admin User'
  //   };
  //   handleUpdatePlan(updatedPlan);
  //   setOpenEditDialog(false);
  // };

  // // Decode limit handlers
  // const handleManageDecodes = () => {
  //   setOpenDecodeDialog(true);
  //   handleCloseOpenMenu();
  // };

  // const handlePresetSelect = (preset) => {
  //   setEditForm(prev => ({
  //     ...prev,
  //     weeklyDecodeLimit: preset.weekly,
  //     monthlyDecodeLimit: preset.monthly,
  //     dailyDecodeLimit: preset.daily
  //   }));
  // };

  // // Analytics handlers
  // const handleViewAnalytics = () => {
  //   setOpenAnalyticsDialog(true);
  //   handleCloseOpenMenu();
  // };

  // // Duplicate handler
  // const handleDuplicatePlan = () => {
  //   const duplicatedPlan = {
  //     ...plan,
  //     id: `${plan.id}_copy_${Date.now()}`,
  //     name: `${plan.name} (Copy)`,
  //     status: PLAN_STATUS.DRAFT,
  //     subscriberCount: 0,
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString()
  //   };
  //   handleUpdatePlan(duplicatedPlan);
  //   handleCloseOpenMenu();
  // };

  // // Helper functions
  // const getStatusColor = (status) => {
  //   const colors = {
  //     [PLAN_STATUS.ACTIVE]: 'success',
  //     [PLAN_STATUS.INACTIVE]: 'default',
  //     [PLAN_STATUS.DRAFT]: 'warning',
  //     [PLAN_STATUS.ARCHIVED]: 'error',
  //     [PLAN_STATUS.COMING_SOON]: 'info'
  //   };
  //   return colors[status] || 'default';
  // };

  // const formatPrice = (price) => {
  //   return price === 0 ? 'Free' : `$${price?.toFixed(2)}`;
  // };

  // const formatDecodeLimit = (limit) => {
  //   return limit === -1 ? 'Unlimited' : limit?.toString();
  // };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString();
  };

  return (
    <>
      <TableRow hover>
        {/* <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            checked={isSelected}
            onClick={(event) => handleSelectRow(event, plan.id)}
          />
        </TableCell> */}

        {/* Plan Name */}
        <TableCell padding="normal">
          <FlexBox alignItems="center" gap={2}>
            {/* <Avatar
              sx={{ 
                backgroundColor: plan.color,
                width: 40,
                height: 40,
                fontSize: '1.2rem'
              }}
              variant="rounded"
            >
              {plan.icon}
            </Avatar> */}
            <div>
              <Paragraph fontWeight={500} color="text.primary">
                {plan.name}
              </Paragraph>
            </div>
          </FlexBox>
        </TableCell>

        {/* Type */}
        <TableCell padding="normal">
          <Chip
            label={plan.type}
            size="small"
            variant="outlined"
            sx={{
              color:
                plan.type === "Basic"
                  ? "red"
                  : plan.type === "Standard"
                    ? "green"
                    : plan.type === "Popular"
                      ? "blue"
                      : "default",
              borderColor:
                plan.type === "Basic"
                  ? "red"
                  : plan.type === "Standard"
                    ? "green"
                    : plan.type === "Popular"
                      ? "blue"
                      : "default",
            }}
          />
        </TableCell>
        <TableCell padding="normal">
          <div>
            <Paragraph fontWeight={500} color="text.primary">
              {plan.aiprompts}
            </Paragraph>
          </div>
        </TableCell>
        <TableCell padding="normal">
          <div>
            <Paragraph fontWeight={500} color="text.primary">
              {plan.updatedAt?.toDate
                ? `${plan.updatedAt.toDate().toLocaleTimeString()} - ${plan.updatedAt.toDate().toLocaleDateString()}`
                : "N/A"}
            </Paragraph>
          </div>
        </TableCell>

        {/* Weekly Decode Limit */}
        {/* <TableCell padding="normal">
          <Paragraph fontWeight={500} color={plan.weeklyDecodeLimit === -1 ? 'primary.main' : 'text.primary'}>
            {formatDecodeLimit(plan.weeklyDecodeLimit)}
          </Paragraph>
        </TableCell>

        {/* Subscribers */}
        {/* <TableCell padding="normal">
          <Paragraph fontWeight={500}>
            {plan.subscriberCount?.toLocaleString()}
          </Paragraph>
          <Small color="text.secondary">
            {plan.conversionRate}% conversion
          </Small>
        </TableCell> */}

        {/* Status */}
        {/* <TableCell padding="normal">
          <Chip 
            label={plan.status}
            size="small"
            color={getStatusColor(plan.status)}
          />
        </TableCell>  */}

        {/* Last Updated */}
        {/* <TableCell padding="normal">
          <Paragraph fontSize={13}>
            {formatDate(plan.updatedAt)}
          </Paragraph>
          <Small color="text.secondary">
            by {plan.lastModifiedBy}
          </Small>
        </TableCell> */}

        {/* Actions */}
        <TableCell padding="normal">
          <TableMoreMenu
            open={openMenuEl}
            handleOpen={handleOpenMenu}
            handleClose={handleCloseOpenMenu}
          >
            {/* <TableMoreMenuItem
              Icon={VisibilityOutlined}
              title={t("View Details")}
              handleClick={handleViewDetails}
            /> */}
            <TableMoreMenuItem
              Icon={Edit}
              title={t("Edit Plan")}
              handleClick={handleEditClick}
            />

            {/* <TableMoreMenuItem
              Icon={TrendingUpOutlined}
              title={t("View Analytics")}
              handleClick={handleViewAnalytics}
            /> */}
            {/* <TableMoreMenuItem
              Icon={ContentCopy}
              title={t("Duplicate Plan")}
              handleClick={handleDuplicatePlan}
            /> */}
            <TableMoreMenuItem
              Icon={DeleteOutline}
              title={t("Delete")}
              handleClick={handleDeleteConfirmation}
            />
          </TableMoreMenu>
        </TableCell>
      </TableRow>

      {/* View Details Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <FlexBox alignItems="center" gap={2}>
            <Avatar sx={{ backgroundColor: plan.color }}>{plan.icon}</Avatar>
            <div>
              <Typography variant="h6">{plan.name}</Typography>
              {/* <Typography variant="body2" color="text.secondary">
                {plan.type} Plan - {formatPrice(plan.price)}
              </Typography> */}
            </div>
          </FlexBox>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" paragraph>
                {plan.description}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Long Description
              </Typography>
              <Typography variant="body2" paragraph>
                {plan.longDescription}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Button Configuration
              </Typography>
              <Typography variant="body2">Text: {plan.buttonText}</Typography>
              <Typography variant="body2">
                Subtext: {plan.buttonSubtext}
              </Typography>
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Decode Limits</Typography>
              <Typography variant="body2">Weekly: {formatDecodeLimit(plan.weeklyDecodeLimit)}</Typography>
              <Typography variant="body2">Monthly: {formatDecodeLimit(plan.monthlyDecodeLimit)}</Typography>
              <Typography variant="body2">Daily: {formatDecodeLimit(plan.dailyDecodeLimit)}</Typography>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Statistics</Typography>
              <Typography variant="body2">Subscribers: {plan.subscriberCount?.toLocaleString()}</Typography>
              <Typography variant="body2">Conversion Rate: {plan.conversionRate}%</Typography>
              <Typography variant="body2">Churn Rate: {plan.churnRate}%</Typography>
            </Grid> */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Features
              </Typography>
              {/* <Grid container spacing={1}>
                {plan.features.map((feature, index) => (
                  <Grid item key={index}>
                    <Chip 
                      label={`${feature.name}: ${feature.value}`}
                      size="small"
                      color={feature.included ? 'primary' : 'default'}
                      variant={feature.included ? 'filled' : 'outlined'}
                    />
                  </Grid>
                ))}
              </Grid> */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Plan Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Subscription Plan</DialogTitle>
        <DialogContent>
          {/* <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Plan Name"
                value={editForm.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                value={editForm.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                margin="normal"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                label="Long Description"
                value={editForm.longDescription}
                onChange={(e) => handleFormChange('longDescription', e.target.value)}
                margin="normal"
                multiline
                rows={3}
              />
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={editForm.price}
                onChange={(e) => handleFormChange('price', parseFloat(e.target.value))}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Button Text"
                value={editForm.buttonText}
                onChange={(e) => handleFormChange('buttonText', e.target.value)}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Button Text Template</InputLabel>
                <Select
                  value=""
                  onChange={(e) => handleFormChange('buttonText', e.target.value)}
                >
                  {BUTTON_TEXT_TEMPLATES.map(template => (
                    <MenuItem key={template} value={template}>{template}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Button Subtext"
                value={editForm.buttonSubtext}
                onChange={(e) => handleFormChange('buttonSubtext', e.target.value)}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={editForm.status}
                  onChange={(e) => handleFormChange('status', e.target.value)}
                >
                  {Object.values(PLAN_STATUS).map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Billing Cycle</InputLabel>
                <Select
                  value={editForm.billingCycle}
                  onChange={(e) => handleFormChange('billingCycle', e.target.value)}
                >
                  {Object.values(BILLING_CYCLES).map(cycle => (
                    <MenuItem key={cycle} value={cycle}>{cycle}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid> */}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveChanges} variant="contained">Save Changes</Button>
        </DialogActions> */}
      </Dialog>

      {/* Manage Decode Limits Dialog */}
      <Dialog
        open={openDecodeDialog}
        onClose={() => setOpenDecodeDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Manage Weekly Decode Limits</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Control how many AI decodes users can perform per week with this
            plan.
          </Typography>

          {/* <TextField
            fullWidth
            label="Weekly Decode Limit"
            type="number"
            value={editForm.weeklyDecodeLimit === -1 ? '' : editForm.weeklyDecodeLimit}
            onChange={(e) => {
              const value = e.target.value === '' ? -1 : parseInt(e.target.value);
              handleFormChange('weeklyDecodeLimit', value);
            }}
            margin="normal"
            helperText="Enter -1 for unlimited decodes"
          /> */}

          {/* <TextField
            fullWidth
            label="Monthly Decode Limit"
            type="number"
            value={editForm.monthlyDecodeLimit === -1 ? '' : editForm.monthlyDecodeLimit}
            onChange={(e) => {
              const value = e.target.value === '' ? -1 : parseInt(e.target.value);
              handleFormChange('monthlyDecodeLimit', value);
            }}
            margin="normal"
            helperText="Enter -1 for unlimited decodes"
          /> */}

          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
            Quick Presets
          </Typography>
          {/* <Grid container spacing={1}>
            {Object.entries(DECODE_LIMIT_PRESETS).map(([key, preset]) => (
              <Grid item key={key}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handlePresetSelect(preset)}
                  sx={{ textTransform: 'none' }}
                >
                  {key.charAt(0) + key.slice(1).toLowerCase()}: {formatDecodeLimit(preset.weekly)}/week
                </Button>
              </Grid>
            ))}
          </Grid> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDecodeDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog
        open={openAnalyticsDialog}
        onClose={() => setOpenAnalyticsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Plan Analytics - {plan.name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" p={2} bgcolor="background.paper">
                <Typography variant="h4" color="primary">
                  {plan.subscriberCount?.toLocaleString()}
                </Typography>
                <Typography variant="body2">Total Subscribers</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" p={2} bgcolor="background.paper">
                <Typography variant="h4" color="success.main">
                  {plan.conversionRate}%
                </Typography>
                <Typography variant="body2">Conversion Rate</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" p={2} bgcolor="background.paper">
                <Typography variant="h4" color="error.main">
                  {plan.churnRate}%
                </Typography>
                <Typography variant="body2">Churn Rate</Typography>
              </Box>
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Performance Metrics</Typography>
              <Typography variant="body2">Views: {plan.viewCount?.toLocaleString()}</Typography>
              <Typography variant="body2">Clicks: {plan.clickCount?.toLocaleString()}</Typography>
              <Typography variant="body2">Signups: {plan.signupCount?.toLocaleString()}</Typography>
              <Typography variant="body2">Avg Lifetime Value: ${plan.avgLifetimeValue}</Typography>
            </Grid> */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Usage Statistics
              </Typography>
              {/* <Typography variant="body2">Weekly Decodes: {formatDecodeLimit(plan.weeklyDecodeLimit)}</Typography>
              <Typography variant="body2">Monthly Decodes: {formatDecodeLimit(plan.monthlyDecodeLimit)}</Typography> */}
              <Typography variant="body2">
                Support Level: {plan.supportLevel}
              </Typography>
              <Typography variant="body2">
                Trial Days: {plan.trialDays}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAnalyticsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Subscription Plan</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the plan "{plan.name}"? This action
            cannot be undone and will affect {plan.subscriberCount} subscribers.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteConfirm(plan.id)}
            color="error"
            variant="contained"
          >
            Delete Plan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
