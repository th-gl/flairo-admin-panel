import React from "react";
import { UserList } from "../page-view";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTranslation } from "react-i18next";

/**
 * UserManagementDemo Component
 * 
 * This demo component showcases the user management functionality where:
 * 1. Admin can view all users with their access levels and plan status
 * 2. Admin can filter users by access level, plan status, and search
 * 3. Admin can change user access levels manually (Free, Premium, Enterprise, VIP)
 * 4. Admin can update plan status (Active, Trial, Expired, Inactive)
 * 5. Admin can give premium access without payment if needed
 * 6. Admin can set subscription end dates
 * 7. Admin can delete users individually or in bulk
 * 
 * Features:
 * - Visual chips showing access levels with color coding
 * - Action menu with "Manage Access" option
 * - Modal dialog for changing user access levels
 * - Confirmation dialogs for destructive actions
 * - Responsive design with proper filtering
 */

export default function UserManagementDemo() {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      {/* Demo Instructions */}
      <Card sx={{ mb: 3, backgroundColor: "primary.50" }}>
        <CardContent>
          <Typography variant="h6" color="primary.main" gutterBottom>
            {t("User Management System Demo")}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {t("This demonstrates the user management functionality where admins can:")}
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: "text.secondary" }}>
            <li>{t("View all users with their access levels and plan status")}</li>
            <li>{t("Filter users by access level, plan status, and search terms")}</li>
            <li>{t("Change user access levels manually (Free, Premium, Enterprise, VIP)")}</li>
            <li>{t("Update plan status and subscription dates")}</li>
            <li>{t("Give premium access without payment when needed")}</li>
            <li>{t("Delete users individually or in bulk")}</li>
          </Box>
          <Typography variant="body2" color="info.main" sx={{ mt: 2, fontWeight: 600 }}>
            {t("Click the Actions button (⋮) next to any user and select 'Manage Access' to change their plan!")}
          </Typography>
        </CardContent>
      </Card>

      {/* User Management Table */}
      <UserList />
    </Box>
  );
} 