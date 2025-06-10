import HeadingArea from "../HeadingArea.jsx";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SearchArea from "../SearchArea.jsx";
import { useCallback, useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Scrollbar from "@/components/scrollbar";
import { TableDataNotFound, TableToolbar } from "@/components/table";
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable";
import { SUBSCRIPTION_PLANS_LIST, PLAN_STATS, PLAN_STATUS, PLAN_TYPES } from "@/__fakeData__/subscriptionPlans";
import Table from "@mui/material/Table";
import ServiceTableHead from "../ServiceTableHead.jsx";
import TableBody from "@mui/material/TableBody";
import ServiceTableRow from "../ServiceTableRow.jsx";
import { useTranslation } from "react-i18next";
import TableSkeleton from "@/components/loader/TableSkeleton.jsx";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function ServiceList() {
  const { t } = useTranslation();
  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    handleSelectRow,
    handleRequestSort,
    handleSelectAllRows,
    handleChangeRowsPerPage,
    selected,
    isSelected,
    handleChangePage,
  } = useMuiTable({ defaultOrderBy: "name" });

  const [plans, setPlans] = useState(SUBSCRIPTION_PLANS_LIST);
  const [planFilter, setPlanFilter] = useState({ 
    type: "", 
    status: "", 
    search: "" 
  });
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(SUBSCRIPTION_PLANS_LIST.length);
  const [sortData, setSortData] = useState({ name: '', order: '' });
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    type: PLAN_TYPES.BASIC,
    description: '',
    price: 0,
    weeklyDecodeLimit: 25,
    status: PLAN_STATUS.DRAFT
  });

  const handleChangeFilter = (key, value) => {
    setPlanFilter((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const filteredPlans = stableSort(plans, getComparator(order, orderBy)).filter(
    (plan) => {
      let matches = true;
      
      if (planFilter.type && planFilter.type !== '') {
        matches = matches && plan.type.toLowerCase() === planFilter.type.toLowerCase();
      }
      
      if (planFilter.status && planFilter.status !== '') {
        matches = matches && plan.status.toLowerCase() === planFilter.status.toLowerCase();
      }
      
      if (planFilter.search && planFilter.search !== '') {
        matches = matches && (
          plan.name.toLowerCase().includes(planFilter.search.toLowerCase()) ||
          plan.description.toLowerCase().includes(planFilter.search.toLowerCase())
        );
      }
      
      return matches;
    }
  );

  const handleDeletePlan = (id) => {
    setPlans((state) => state.filter((item) => item.id !== id));
    toast.success(t("Subscription plan deleted successfully"));
  };

  const handleUpdatePlan = (updatedPlan) => {
    setPlans((state) => {
      const existingIndex = state.findIndex(p => p.id === updatedPlan.id);
      if (existingIndex >= 0) {
        // Update existing plan
        const newState = [...state];
        newState[existingIndex] = updatedPlan;
        toast.success(t("Subscription plan updated successfully"));
        return newState;
      } else {
        // Add new plan
        toast.success(t("Subscription plan created successfully"));
        return [...state, updatedPlan];
      }
    });
  };

  const handleAllPlanDelete = () => {
    setPlans((state) => state.filter((item) => !selected.includes(item.id)));
    handleSelectAllRows([])();
    toast.success(t("Selected subscription plans deleted successfully"));
  };

  const handleSort = (sortOrder, sortField) => {
    setSortData({ name: sortField, order: sortOrder });
  };

  const handleCreatePlan = () => {
    const newPlanData = {
      ...newPlan,
      id: `plan_new_${Date.now()}`,
      slug: newPlan.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'Admin User',
      lastModifiedBy: 'Admin User',
      version: '1.0',
      isCurrentVersion: true,
      subscriberCount: 0,
      conversionRate: '0.00',
      churnRate: '0.00',
      avgLifetimeValue: '0.00',
      viewCount: 0,
      clickCount: 0,
      signupCount: 0,
      features: [],
      buttonText: 'Get Started',
      buttonSubtext: '',
      popularBadge: false,
      customizable: {
        weeklyDecodeLimit: true,
        description: true,
        buttonText: true,
        features: true,
        price: true
      }
    };
    
    handleUpdatePlan(newPlanData);
    setOpenCreateDialog(false);
    setNewPlan({
      name: '',
      type: PLAN_TYPES.BASIC,
      description: '',
      price: 0,
      weeklyDecodeLimit: 25,
      status: PLAN_STATUS.DRAFT
    });
  };

  const StatCard = ({ title, value, icon, color = "primary", subtitle }) => (
    <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box sx={{ color: `${color}.main`, fontSize: '2rem' }}>
          {icon}
        </Box>
        <div>
          <Typography variant="h4" color={`${color}.main`} fontWeight="bold">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.disabled">
              {subtitle}
            </Typography>
          )}
        </div>
      </Box>
    </Card>
  );

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          {/* Statistics Overview */}
          {/* <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Plans"
                value={PLAN_STATS.totalPlans}
                icon={<AssessmentIcon />}
                color="primary"
                subtitle={`${PLAN_STATS.activePlans} active`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Subscribers"
                value={PLAN_STATS.totalSubscribers.toLocaleString()}
                icon={<PeopleIcon />}
                color="success"
                subtitle="across all plans"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Monthly Revenue"
                value={`$${PLAN_STATS.totalRevenue}`}
                icon={<AttachMoneyIcon />}
                color="warning"
                subtitle="recurring revenue"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Avg Conversion"
                value={`${PLAN_STATS.avgConversionRate}%`}
                icon={<TrendingUpIcon />}
                color="info"
                subtitle={`${PLAN_STATS.avgChurnRate}% churn rate`}
              />
            </Grid>
          </Grid> */}

          <Card>
            <Box p={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <HeadingArea 
                  title="Subscription Plans Management"
                  subtitle="Create and manage subscription plans, decode limits, and pricing"
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenCreateDialog(true)}
                >
                  Create New Plan
                </Button>
              </Box>

              {/* Filters */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                  <SearchArea
                    value={planFilter.search}
                    onChange={(e) => handleChangeFilter("search", e.target.value)}
                    placeholder="Search plans..."
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Filter by Type</InputLabel>
                    <Select
                      value={planFilter.type}
                      label="Filter by Type"
                      onChange={(e) => handleChangeFilter("type", e.target.value)}
                    >
                      <MenuItem value="">All Types</MenuItem>
                      {Object.values(PLAN_TYPES).map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Filter by Status</InputLabel>
                    <Select
                      value={planFilter.status}
                      label="Filter by Status"
                      onChange={(e) => handleChangeFilter("status", e.target.value)}
                    >
                      <MenuItem value="">All Statuses</MenuItem>
                      {Object.values(PLAN_STATUS).map(status => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Box display="flex" alignItems="center" height="100%">
                    <Typography variant="body2" color="text.secondary">
                      {filteredPlans.length} of {plans.length} plans
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Most Popular Plan */}
              {/* {PLAN_STATS.mostPopularPlan && (
                <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    🏆 Most Popular Plan
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Chip 
                      label={PLAN_STATS.mostPopularPlan.name}
                      color="primary"
                      variant="filled"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {PLAN_STATS.mostPopularPlan.subscriberCount.toLocaleString()} subscribers • 
                      {PLAN_STATS.mostPopularPlan.conversionRate}% conversion rate
                    </Typography>
                  </Box>
                </Box>
              )} */}
            </Box>

            {selected.length > 0 && (
              <TableToolbar
                selected={selected.length}
                handleDeleteRows={handleAllPlanDelete}
              />
            )}

            <TableContainer>
              <Scrollbar autoHide={false}>
                <Table>
                  <ServiceTableHead
                    order={order}
                    orderBy={orderBy}
                    numSelected={selected.length}
                    handleSort={handleSort}
                    rowCount={filteredPlans.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllRows={handleSelectAllRows(
                      filteredPlans.map((row) => row.id)
                    )}
                  />

                  <TableBody>
                    {filteredPlans
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((plan) => (
                        <ServiceTableRow
                          key={plan.id}
                          plan={plan}
                          isSelected={isSelected(plan.id)}
                          handleSelectRow={handleSelectRow}
                          handleDeletePlan={handleDeletePlan}
                          handleUpdatePlan={handleUpdatePlan}
                        />
                      ))}

                    {filteredPlans.length === 0 && (
                      <TableDataNotFound 
                        title="No subscription plans found"
                        subtitle="Try adjusting your search or filter criteria"
                      />
                    )}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePagination
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={filteredPlans.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </Card>

          {/* Create New Plan Dialog */}
          <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Create New Subscription Plan</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Plan Name"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Plan Type</InputLabel>
                    <Select
                      value={newPlan.type}
                      label="Plan Type"
                      onChange={(e) => setNewPlan(prev => ({ ...prev, type: e.target.value }))}
                    >
                      {Object.values(PLAN_TYPES).map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={newPlan.status}
                      label="Status"
                      onChange={(e) => setNewPlan(prev => ({ ...prev, status: e.target.value }))}
                    >
                      {Object.values(PLAN_STATUS).map(status => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={newPlan.description}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, description: e.target.value }))}
                    margin="normal"
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Price (USD)"
                    type="number"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    margin="normal"
                    inputProps={{ min: 0, step: 0.01 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Weekly Decode Limit"
                    type="number"
                    value={newPlan.weeklyDecodeLimit}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, weeklyDecodeLimit: parseInt(e.target.value) }))}
                    margin="normal"
                    helperText="Enter -1 for unlimited"
                    inputProps={{ min: -1 }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
              <Button 
                onClick={handleCreatePlan} 
                variant="contained"
                disabled={!newPlan.name.trim()}
              >
                Create Plan
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
} 