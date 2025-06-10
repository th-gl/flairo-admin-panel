import React from "react";
import ServiceList from "../page-view/service-list";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import { ACTIVITY_STATS, FLOW_BEHAVIOR, DEVICE_STATUS } from "@/__fakeData__/userActivity";
import Chip from "@mui/material/Chip";
import { Paragraph } from "@/components/typography";
import FlexBox from "@/components/flexbox/FlexBox";

/**
 * UserActivityDemo Component
 * 
 * This demo component showcases the user activity tracking functionality where:
 * 1. Admin can monitor all user activities in real-time
 * 2. View device-specific activity patterns and behaviors
 * 3. Track frequency of actions and detect suspicious behavior
 * 4. Monitor session durations, locations, and device information
 * 5. Filter activities by flow behavior, device status, and activity type
 * 6. View detailed activity information for each record
 * 7. Block/unblock devices based on suspicious activities
 * 
 * Features:
 * - Real-time activity monitoring
 * - Behavioral analysis and risk scoring
 * - Device management and blocking capabilities
 * - Comprehensive activity details and analytics
 * - Advanced filtering and search capabilities
 */

export default function UserActivityDemo() {
  const { t } = useTranslation();

  const getFlowBehaviorColor = (behavior) => {
    switch (behavior) {
      case FLOW_BEHAVIOR.NORMAL:
        return "success";
      case FLOW_BEHAVIOR.SUSPICIOUS:
        return "error";
      case FLOW_BEHAVIOR.HIGH_USAGE:
        return "warning";
      case FLOW_BEHAVIOR.IDLE:
        return "default";
      case FLOW_BEHAVIOR.PEAK:
        return "info";
      default:
        return "default";
    }
  };

  const getDeviceStatusColor = (status) => {
    switch (status) {
      case DEVICE_STATUS.ACTIVE:
        return "success";
      case DEVICE_STATUS.INACTIVE:
        return "default";
      case DEVICE_STATUS.BLOCKED:
        return "error";
      case DEVICE_STATUS.MONITORING:
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Demo Instructions */}
      <Card sx={{ mb: 3, backgroundColor: "primary.50" }}>
        <CardContent>
          <Typography variant="h6" color="primary.main" gutterBottom>
            {t("User Activity Monitoring System")}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {t("This demonstrates comprehensive user activity tracking where admins can:")}
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: "text.secondary" }}>
            <li>{t("Monitor all user activities with device tracking")}</li>
            <li>{t("View frequency patterns and behavioral analysis")}</li>
            <li>{t("Track timestamps and session information")}</li>
            <li>{t("Analyze flow behavior and risk scores")}</li>
            <li>{t("Filter by behavior, device status, and activity type")}</li>
            <li>{t("View detailed activity information including IP, location, browser")}</li>
            <li>{t("Block/unblock devices based on suspicious activities")}</li>
          </Box>
          <Typography variant="body2" color="info.main" sx={{ mt: 2, fontWeight: 600 }}>
            {t("Click 'Demo Data' to view sample activities, then use Actions (⋮) to view details or manage devices!")}
          </Typography>
        </CardContent>
      </Card>

      {/* Activity Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main" fontWeight="bold">
                {ACTIVITY_STATS.totalActivities}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("Total Activities")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {ACTIVITY_STATS.activeDevices}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("Active Devices")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.main" fontWeight="bold">
                {ACTIVITY_STATS.suspiciousActivities}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("Suspicious Activities")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {ACTIVITY_STATS.averageSessionDuration}m
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("Avg Session Duration")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Flow Behavior Legend */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t("Flow Behavior Types")}
          </Typography>
          <FlexBox gap={2} flexWrap="wrap">
            {Object.values(FLOW_BEHAVIOR).map((behavior) => (
              <Chip
                key={behavior}
                label={behavior}
                color={getFlowBehaviorColor(behavior)}
                size="small"
              />
            ))}
          </FlexBox>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t("Device Status Types")}
          </Typography>
          <FlexBox gap={2} flexWrap="wrap">
            {Object.values(DEVICE_STATUS).map((status) => (
              <Chip
                key={status}
                label={status}
                color={getDeviceStatusColor(status)}
                size="small"
              />
            ))}
          </FlexBox>
        </CardContent>
      </Card>

      {/* User Activity Table */}
      <ServiceList />
    </Box>
  );
} 