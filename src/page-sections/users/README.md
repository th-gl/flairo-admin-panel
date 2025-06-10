# User Management System

This directory contains a comprehensive user management system for admin panels that allows administrators to manage user access levels and plans manually.

## Features

### 🔐 Access Level Management
- **Free**: Basic access level
- **Premium**: Enhanced features
- **Enterprise**: Advanced business features  
- **VIP**: Highest level access

### 📊 Plan Status Management
- **Active**: Currently active subscription
- **Trial**: Trial period
- **Expired**: Subscription has ended
- **Inactive**: Temporarily disabled

### 🛠 Admin Capabilities
- View all users in a sortable, filterable table
- Change user access levels without payment processing
- Update plan status and subscription end dates
- Grant premium access manually when needed
- Delete users individually or in bulk
- Search and filter by multiple criteria

## Components

### Core Components
- `UserList.jsx` - Main user management interface
- `UserTableHead.jsx` - Enhanced table header with sorting
- `UserTableRow.jsx` - User row with access management actions
- `UserManagementDemo.jsx` - Demo component with instructions

### Mock Data
- `__fakeData__/users.js` - Enhanced user data with access levels and plan information

## Usage

### Basic Implementation
```jsx
import { UserList } from "@/page-sections/users/page-view";

function UserManagementPage() {
  return <UserList />;
}
```

### Demo Implementation
```jsx
import UserManagementDemo from "@/page-sections/users/demo/UserManagementDemo";

function DemoPage() {
  return <UserManagementDemo />;
}
```

## Admin Actions

### Change Access Level
1. Click the Actions menu (⋮) next to any user
2. Select "Manage Access"
3. Choose new access level from dropdown
4. Update plan status if needed
5. Set subscription end date (optional)
6. Save changes

### Bulk Operations
- Select multiple users using checkboxes
- Use the bulk action toolbar to delete selected users

### Filtering
- **Search**: Filter by name, email, or company
- **Access Level**: Filter by Free, Premium, Enterprise, or VIP
- **Plan Status**: Filter by Active, Trial, Expired, or Inactive

## Key Features for Admin Control

### Manual Premium Access
Admins can grant premium access without requiring payment:
1. Open the access management dialog
2. Change access level to "Premium" or higher
3. Set plan status to "Active"
4. Set subscription end date or leave empty for unlimited

### Subscription Management
- View current subscription status
- Extend or modify subscription dates
- Change plan status (useful for trials, expired accounts)
- Grant temporary access for support cases

### Visual Indicators
- Color-coded chips for access levels and plan status
- Clear user information display
- Last login dates for activity monitoring
- Join dates for user lifecycle tracking

## Data Structure

Each user object includes:
```javascript
{
  id: "unique-id",
  name: "User Name",
  email: "user@example.com",
  company: "Company Name",
  avatar: "/path/to/avatar",
  role: "User Role",
  accessLevel: "Premium", // Free, Premium, Enterprise, VIP
  planStatus: "Active",   // Active, Trial, Expired, Inactive
  joinDate: "2023-01-15",
  lastLogin: "2024-01-10",
  subscriptionEnd: "2024-12-31" // null for unlimited
}
```

## Integration Notes

- Uses Material-UI components for consistent design
- Supports internationalization (i18n)
- Includes toast notifications for user feedback
- Responsive design for mobile and desktop
- Built with TypeScript support in mind

## Customization

To customize for your needs:
1. Update `ACCESS_LEVELS` and `PLAN_STATUS` constants in the users mock data
2. Modify the table columns in `UserTableHead.jsx`
3. Add additional user properties in `UserTableRow.jsx`
4. Integrate with your backend API by replacing mock data calls 