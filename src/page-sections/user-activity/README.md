# User Activity Monitoring System

This directory contains a comprehensive user activity monitoring system for admin panels that allows administrators to track and analyze user activities, monitor device behavior, and manage security risks.

## Features

### 🔍 Activity Monitoring
- **Real-time Activity Tracking**: Monitor user activities as they happen
- **Device-specific Tracking**: Track activities by device ID and user
- **Frequency Analysis**: Monitor action frequency per hour/session
- **Timestamp Tracking**: Detailed time-based activity logs

### 📊 Behavioral Analysis
- **Normal**: Standard user behavior patterns
- **Suspicious**: Potentially risky or unusual activities  
- **High Usage**: Intensive usage patterns
- **Idle**: Low activity periods
- **Peak Activity**: High-intensity usage periods

### 🛡️ Security Management
- **Risk Scoring**: 0-100 risk assessment for each activity
- **Device Blocking**: Block/unblock devices based on behavior
- **Status Monitoring**: Active, Inactive, Blocked, Monitoring states
- **Suspicious Activity Detection**: Automated flagging of unusual patterns

### 📈 Analytics & Insights
- **Session Duration Tracking**: Monitor user session lengths
- **Geographic Location**: Track user locations
- **Browser & OS Detection**: Device and platform information
- **Activity Type Classification**: Login, Upload, Download, View, Edit, etc.

## Components

### Core Components
- `ServiceList.jsx` - Main activity monitoring interface (reuses existing structure)
- `ServiceTableHead.jsx` - Enhanced table header for activity data
- `ServiceTableRow.jsx` - Activity row with detailed information and actions
- `UserActivityDemo.jsx` - Demo component with statistics and legends

### Data Structure
- `__fakeData__/userActivity.js` - Comprehensive activity tracking data

## Usage

### Basic Implementation
```jsx
import { UserActivityList } from "@/page-sections/user-activity/page-view";

function UserActivityPage() {
  return <UserActivityList />;
}
```

### Demo Implementation
```jsx
import UserActivityDemo from "@/page-sections/user-activity/demo/UserActivityDemo";

function ActivityDemoPage() {
  return <UserActivityDemo />;
}
```

## Activity Data Structure

Each activity record includes:
```javascript
{
  id: "activity_1",
  device_id: "DEV001",
  user_id: "user_123",
  user_name: "John Doe",
  activity_type: "Login", // Login, Upload, Download, View, Edit, etc.
  frequency: 25, // Actions per hour
  timestamp: "2024-01-10T14:30:00Z",
  flow_behavior: "Normal", // Normal, Suspicious, High Usage, Idle, Peak
  status: "Active", // Active, Inactive, Blocked, Monitoring
  ip_address: "192.168.1.100",
  session_duration: 1800, // Duration in seconds
  pages_visited: 15,
  actions_performed: 8,
  location: "New York",
  browser: "Chrome",
  os: "Windows",
  risk_score: 25 // 0-100 risk assessment
}
```

## Admin Capabilities

### Activity Monitoring
- View all user activities in a sortable, filterable table
- Real-time activity updates and notifications
- Filter by flow behavior, device status, and activity type
- Search by device ID, user name, or activity type

### Security Management
- Block/unblock devices based on suspicious behavior
- View detailed activity information for investigation
- Monitor risk scores and automated threat detection
- Track device status changes and security events

### Analytics & Reporting
- View activity statistics and trends
- Monitor session durations and usage patterns
- Analyze geographic distribution of activities
- Track browser and platform usage

## Key Features for Security

### Risk Assessment
- Automated risk scoring (0-100) for each activity
- Suspicious behavior pattern detection
- Frequency analysis for unusual usage
- Geographic anomaly detection

### Device Management
- Device blocking and unblocking capabilities
- Device status monitoring and updates
- Session management and termination
- Access control based on device behavior

### Activity Analysis
- Detailed activity logging and tracking
- Session duration and usage analytics
- Page visit and action tracking
- Browser and OS fingerprinting

## Filter Options

### Flow Behavior Filters
- **Normal**: Standard user activities
- **Suspicious**: Flagged activities requiring attention
- **High Usage**: Intensive usage patterns
- **Idle**: Low activity periods
- **Peak Activity**: High-intensity usage

### Device Status Filters
- **Active**: Currently active devices
- **Inactive**: Temporarily inactive devices
- **Blocked**: Blocked devices (security measure)
- **Monitoring**: Devices under surveillance

### Activity Type Filters
- Login/Logout activities
- File operations (Upload/Download)
- Content operations (View/Edit/Delete)
- Search and navigation activities
- Sharing and collaboration activities

## Security Features

### Threat Detection
- Real-time monitoring of suspicious activities
- Automated risk scoring and alerting
- Pattern recognition for unusual behavior
- Geographic anomaly detection

### Response Capabilities
- Immediate device blocking for security threats
- Activity investigation and detailed logging
- Session termination for compromised accounts
- Security event tracking and reporting

## Integration Notes

- Preserves existing API functionality while adding demo data
- Uses Material-UI components for consistent design
- Supports internationalization (i18n)
- Includes toast notifications for admin feedback
- Responsive design for mobile and desktop
- Maintains backward compatibility with existing request.js

## Data Source Toggle

The system includes a toggle between:
- **Live Data**: Real API data from existing backend
- **Demo Data**: Rich demonstration data for testing and showcasing

This allows administrators to:
- Test the interface with comprehensive sample data
- Understand all available features and capabilities
- Seamlessly switch to production data when ready
- Maintain existing API integration without disruption

## Customization

To customize for your needs:
1. Update `ACTIVITY_TYPES`, `FLOW_BEHAVIOR`, and `DEVICE_STATUS` constants
2. Modify table columns in `ServiceTableHead.jsx`
3. Add additional activity properties in `ServiceTableRow.jsx`
4. Integrate with your backend API by updating `request.js`
5. Customize risk scoring algorithms in the data generation
6. Add custom filters and analytics as needed 