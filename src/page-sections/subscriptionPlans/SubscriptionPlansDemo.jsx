import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  StarRate as StarRateIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import {
  SUBSCRIPTION_PLANS_LIST,
  PLAN_STATS,
  PLAN_STATUS,
  PLAN_TYPES
} from '@/__fakeData__/subscriptionPlans';

const SubscriptionPlansDemo = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Helper functions
  const getStatusColor = (status) => {
    const colors = {
      [PLAN_STATUS.ACTIVE]: 'success',
      [PLAN_STATUS.INACTIVE]: 'default',
      [PLAN_STATUS.DRAFT]: 'warning',
      [PLAN_STATUS.ARCHIVED]: 'error',
      [PLAN_STATUS.COMING_SOON]: 'info'
    };
    return colors[status] || 'default';
  };

  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
  };

  const formatDecodeLimit = (limit) => {
    return limit === -1 ? 'Unlimited' : `${limit} per week`;
  };

  // Get active plans for display
  const activePlans = SUBSCRIPTION_PLANS_LIST.filter(plan => plan.status === PLAN_STATUS.ACTIVE);
  const mostPopularPlan = PLAN_STATS.mostPopularPlan;

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        📊 Subscription Plans Management Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Complete admin interface for managing subscription plans, decode limits, and pricing
      </Typography>

      {/* Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <AssessmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {PLAN_STATS.totalPlans}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Plans
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    {PLAN_STATS.activePlans} active
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {PLAN_STATS.totalSubscribers.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Subscribers
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    across all plans
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <AttachMoneyIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    ${PLAN_STATS.totalRevenue}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly Revenue
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    recurring revenue
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {PLAN_STATS.avgConversionRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Conversion
                  </Typography>
                  <Typography variant="caption" color="error.main">
                    {PLAN_STATS.avgChurnRate}% churn
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Most Popular Plan Highlight */}
      {mostPopularPlan && (
        <Card sx={{ mb: 4, border: '2px solid', borderColor: 'primary.main' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: mostPopularPlan.color, fontSize: '1.5rem' }}>
                  {mostPopularPlan.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    🏆 Most Popular Plan: {mostPopularPlan.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mostPopularPlan.subscriberCount.toLocaleString()} subscribers • 
                    {mostPopularPlan.conversionRate}% conversion rate • 
                    {formatPrice(mostPopularPlan.price)}/month
                  </Typography>
                </Box>
              </Box>
              <Chip 
                label="Best Seller" 
                color="primary" 
                icon={<StarRateIcon />}
              />
            </Box>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3}>
        {/* Active Plans List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Active Subscription Plans
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<SettingsIcon />}
                  size="small"
                >
                  Manage Plans
                </Button>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Plan</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Weekly Decodes</TableCell>
                      <TableCell>Subscribers</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activePlans.slice(0, 5).map((plan) => (
                      <TableRow 
                        key={plan.id} 
                        hover
                        onClick={() => setSelectedPlan(plan)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ bgcolor: plan.color, width: 32, height: 32 }}>
                              {plan.icon}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {plan.name}
                              </Typography>
                              {plan.popularBadge && (
                                <Chip label="Popular" size="small" color="primary" />
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={plan.type}
                            size="small"
                            variant="outlined"
                            sx={{ color: plan.color, borderColor: plan.color }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {formatPrice(plan.price)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            /{plan.billingCycle.toLowerCase()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2" 
                            color={plan.weeklyDecodeLimit === -1 ? 'primary' : 'text.primary'}
                            fontWeight="medium"
                          >
                            {formatDecodeLimit(plan.weeklyDecodeLimit)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {plan.subscriberCount.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {plan.conversionRate}% conversion
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={plan.status}
                            size="small"
                            color={getStatusColor(plan.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Plan Details & Key Features */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                🎯 Key Management Features
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Adjust Weekly Decode Limits"
                    secondary="Control AI usage per plan without code changes"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Edit Plan Descriptions & Button Text"
                    secondary="Update plan copy and CTA buttons dynamically"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Real-time Analytics"
                    secondary="Monitor conversion rates and subscriber growth"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Pricing Management"
                    secondary="Update pricing and billing cycles easily"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Feature Control"
                    secondary="Enable/disable features per plan tier"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Decode Limits Overview */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📈 Decode Limits Overview
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Current weekly decode allocation across all plans
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Average Weekly Decodes: {PLAN_STATS.avgWeeklyDecodes}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={75} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Total Weekly Capacity: {PLAN_STATS.totalWeeklyDecodes.toLocaleString()}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={60} 
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Quick Decode Limit Presets:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                <Chip label="Light: 25/week" size="small" variant="outlined" />
                <Chip label="Standard: 50/week" size="small" variant="outlined" />
                <Chip label="Pro: 100/week" size="small" variant="outlined" />
                <Chip label="Unlimited" size="small" variant="outlined" color="primary" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Selected Plan Details */}
      {selectedPlan && (
        <Card sx={{ mt: 3, border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Plan Details: {selectedPlan.name}
              </Typography>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => setSelectedPlan(null)}
              >
                Close
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Description</Typography>
                <Typography variant="body2" paragraph>{selectedPlan.description}</Typography>
                
                <Typography variant="subtitle2" gutterBottom>Button Configuration</Typography>
                <Typography variant="body2">Text: "{selectedPlan.buttonText}"</Typography>
                <Typography variant="body2">Subtext: "{selectedPlan.buttonSubtext}"</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Decode Limits (Editable)</Typography>
                <Typography variant="body2">Weekly: {formatDecodeLimit(selectedPlan.weeklyDecodeLimit)}</Typography>
                <Typography variant="body2">Monthly: {selectedPlan.monthlyDecodeLimit === -1 ? 'Unlimited' : selectedPlan.monthlyDecodeLimit}</Typography>
                
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Performance</Typography>
                <Typography variant="body2">Subscribers: {selectedPlan.subscriberCount.toLocaleString()}</Typography>
                <Typography variant="body2">Conversion: {selectedPlan.conversionRate}%</Typography>
                <Typography variant="body2">Churn Rate: {selectedPlan.churnRate}%</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          🚀 Ready to manage your subscription plans?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          The subscription plans management system provides full control over pricing, 
          decode limits, descriptions, and button text - all without requiring code changes.
        </Typography>
        <Box display="flex" gap={2} justifyContent="center">
          <Button 
            variant="contained" 
            size="large"
            startIcon={<SettingsIcon />}
          >
            Access Plans Management
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            startIcon={<AssessmentIcon />}
          >
            View Analytics Dashboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionPlansDemo; 