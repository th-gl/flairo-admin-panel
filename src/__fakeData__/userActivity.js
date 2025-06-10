// User Activity Types
export const ACTIVITY_TYPES = {
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  UPLOAD: 'Upload',
  DOWNLOAD: 'Download',
  VIEW: 'View',
  EDIT: 'Edit',
  DELETE: 'Delete',
  SEARCH: 'Search',
  EXPORT: 'Export',
  SHARE: 'Share'
};

export const FLOW_BEHAVIOR = {
  NORMAL: 'Normal',
  SUSPICIOUS: 'Suspicious',
  HIGH_USAGE: 'High Usage',
  IDLE: 'Idle',
  PEAK: 'Peak Activity'
};

export const DEVICE_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  BLOCKED: 'Blocked',
  MONITORING: 'Monitoring'
};

// Generate realistic activity data
const generateActivityData = () => {
  const activities = [];
  const deviceIds = ['DEV001', 'DEV002', 'DEV003', 'DEV004', 'DEV005', 'DEV006', 'DEV007', 'DEV008', 'DEV009', 'DEV010'];
  const users = ['Zachary Gomez', 'Amanda Montgomery', 'Lester Holland', 'Max Allison', 'Richard Gregory', 'Clifford Caldwell'];
  
  for (let i = 0; i < 50; i++) {
    const deviceId = deviceIds[Math.floor(Math.random() * deviceIds.length)];
    const userName = users[Math.floor(Math.random() * users.length)];
    const activityType = Object.values(ACTIVITY_TYPES)[Math.floor(Math.random() * Object.values(ACTIVITY_TYPES).length)];
    const flowBehavior = Object.values(FLOW_BEHAVIOR)[Math.floor(Math.random() * Object.values(FLOW_BEHAVIOR).length)];
    const status = Object.values(DEVICE_STATUS)[Math.floor(Math.random() * Object.values(DEVICE_STATUS).length)];
    
    // Generate random timestamps within the last 30 days
    const baseTime = new Date();
    const randomDays = Math.floor(Math.random() * 30);
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    
    const timestamp = new Date(baseTime.getTime() - (randomDays * 24 * 60 * 60 * 1000) - (randomHours * 60 * 60 * 1000) - (randomMinutes * 60 * 1000));
    
    activities.push({
      id: `activity_${i + 1}`,
      device_id: deviceId,
      user_id: `user_${Math.floor(Math.random() * 100) + 1}`,
      user_name: userName,
      activity_type: activityType,
      frequency: Math.floor(Math.random() * 100) + 1, // 1-100 activities per hour
      timestamp: timestamp.toISOString(),
      flow_behavior: flowBehavior,
      status: status,
      ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      session_duration: Math.floor(Math.random() * 7200) + 300, // 5 minutes to 2 hours in seconds
      pages_visited: Math.floor(Math.random() * 50) + 1,
      actions_performed: Math.floor(Math.random() * 20) + 1,
      location: ['New York', 'London', 'Tokyo', 'Mumbai', 'Sydney', 'Berlin'][Math.floor(Math.random() * 6)],
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)],
      os: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'][Math.floor(Math.random() * 5)],
      created_at: timestamp.toISOString(),
      risk_score: Math.floor(Math.random() * 100), // 0-100 risk score
    });
  }
  
  return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const USER_ACTIVITY_LIST = generateActivityData();

// Real-time activity simulation data
export const REALTIME_ACTIVITIES = [
  {
    id: 'rt_1',
    device_id: 'DEV001',
    user_name: 'John Doe',
    activity_type: ACTIVITY_TYPES.LOGIN,
    timestamp: new Date().toISOString(),
    flow_behavior: FLOW_BEHAVIOR.NORMAL,
    status: DEVICE_STATUS.ACTIVE
  },
  {
    id: 'rt_2',
    device_id: 'DEV002',
    user_name: 'Jane Smith',
    activity_type: ACTIVITY_TYPES.UPLOAD,
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    flow_behavior: FLOW_BEHAVIOR.HIGH_USAGE,
    status: DEVICE_STATUS.MONITORING
  },
  {
    id: 'rt_3',
    device_id: 'DEV003',
    user_name: 'Mike Johnson',
    activity_type: ACTIVITY_TYPES.DOWNLOAD,
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    flow_behavior: FLOW_BEHAVIOR.SUSPICIOUS,
    status: DEVICE_STATUS.BLOCKED
  }
];

// Activity summary statistics
export const ACTIVITY_STATS = {
  totalActivities: USER_ACTIVITY_LIST.length,
  activeDevices: [...new Set(USER_ACTIVITY_LIST.filter(a => a.status === DEVICE_STATUS.ACTIVE).map(a => a.device_id))].length,
  suspiciousActivities: USER_ACTIVITY_LIST.filter(a => a.flow_behavior === FLOW_BEHAVIOR.SUSPICIOUS).length,
  blockedDevices: [...new Set(USER_ACTIVITY_LIST.filter(a => a.status === DEVICE_STATUS.BLOCKED).map(a => a.device_id))].length,
  averageSessionDuration: Math.round(USER_ACTIVITY_LIST.reduce((sum, a) => sum + a.session_duration, 0) / USER_ACTIVITY_LIST.length / 60), // in minutes
  topActivityType: Object.values(ACTIVITY_TYPES).reduce((a, b) => 
    USER_ACTIVITY_LIST.filter(item => item.activity_type === a).length > 
    USER_ACTIVITY_LIST.filter(item => item.activity_type === b).length ? a : b
  )
}; 