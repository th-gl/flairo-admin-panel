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
  Speed as SpeedIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  Analytics as AnalyticsIcon,
  SmartToy as SmartToyIcon
} from '@mui/icons-material';
import {
  AI_OUTPUT_LIST,
  QA_STATS,
  OUTPUT_STATUS,
  AI_MODELS,
  AI_OUTPUT_TYPES
} from '@/__fakeData__/aiOutputs';

const RecentAIOutputDemo = () => {
  const [selectedOutput, setSelectedOutput] = useState(null);

  // Helper functions
  const getStatusColor = (status) => {
    const colors = {
      [OUTPUT_STATUS.SUCCESS]: 'success',
      [OUTPUT_STATUS.PARTIAL_SUCCESS]: 'warning',
      [OUTPUT_STATUS.ERROR]: 'error',
      [OUTPUT_STATUS.TIMEOUT]: 'error',
      [OUTPUT_STATUS.PROCESSING]: 'info',
      [OUTPUT_STATUS.QUEUED]: 'default'
    };
    return colors[status] || 'default';
  };

  const formatTime = (ms) => {
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`;
  };

  const truncateText = (text, length = 100) => {
    return text?.length > length ? `${text.substring(0, length)}...` : text;
  };

  // Get recent outputs for display
  const recentOutputs = AI_OUTPUT_LIST.slice(0, 10);

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        🤖 Recent AI Output Management Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Complete monitoring and QA system for AI-generated content with real-time analytics
      </Typography>

      {/* Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <AssignmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {QA_STATS.totalOutputs}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total AI Outputs
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    {QA_STATS.qaReviewedCount} QA reviewed
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
                  <CheckCircleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {QA_STATS.successRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Success Rate
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    across all models
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
                  <SpeedIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {QA_STATS.avgProcessingTime}ms
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Processing Time
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    real-time monitoring
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
                  <SecurityIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {QA_STATS.avgConfidenceScore}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Confidence
                  </Typography>
                  <Typography variant="caption" color="error.main">
                    {QA_STATS.flaggedForReview} flagged
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent AI Outputs List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Recent AI Outputs
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AnalyticsIcon />}
                  size="small"
                >
                  View All Outputs
                </Button>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>User/Device</TableCell>
                      <TableCell>Output Type</TableCell>
                      <TableCell>AI Model</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Processing Time</TableCell>
                      <TableCell>Confidence</TableCell>
                      <TableCell>QA Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOutputs.map((output) => (
                      <TableRow 
                        key={output.id} 
                        hover
                        onClick={() => setSelectedOutput(output)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {output.user_name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {output.device_id}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {output.output_type}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {truncateText(output.prompt, 30)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={output.ai_model}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={output.status}
                            size="small"
                            color={getStatusColor(output.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatTime(output.processing_time_ms)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2"
                            color={output.confidence_score >= 80 ? 'success.main' : 'text.primary'}
                          >
                            {output.confidence_score}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            {output.qa_reviewed ? (
                              <CheckCircleIcon fontSize="small" color="success" />
                            ) : (
                              <ScheduleIcon fontSize="small" color="warning" />
                            )}
                            <Typography variant="caption">
                              {output.qa_reviewed ? 'Reviewed' : 'Pending'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* QA Management Features */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                🎯 QA Management Features
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Real-time Output Monitoring"
                    secondary="Track all AI outputs as they're generated"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Quality Assurance Workflow"
                    secondary="Review, approve, and flag outputs for quality"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Performance Analytics"
                    secondary="Monitor processing times and confidence scores"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Model Comparison"
                    secondary="Compare performance across different AI models"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Safety Monitoring"
                    secondary="Track safety scores and flag inappropriate content"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📊 Performance Metrics
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  QA Review Progress: {QA_STATS.qaReviewedCount}/{QA_STATS.totalOutputs}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(QA_STATS.qaReviewedCount / QA_STATS.totalOutputs) * 100} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Success Rate: {QA_STATS.successRate}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={QA_STATS.successRate} 
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                AI Model Usage:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                <Chip label="GPT-4: 35%" size="small" variant="outlined" />
                <Chip label="GPT-3.5: 28%" size="small" variant="outlined" />
                <Chip label="Claude: 22%" size="small" variant="outlined" />
                <Chip label="LLaMA: 15%" size="small" variant="outlined" />
              </Box>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Output Types:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                <Chip label="Text Gen: 40%" size="small" variant="outlined" color="primary" />
                <Chip label="Analysis: 30%" size="small" variant="outlined" color="success" />
                <Chip label="Translation: 20%" size="small" variant="outlined" color="info" />
                <Chip label="Other: 10%" size="small" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Selected Output Details */}
      {selectedOutput && (
        <Card sx={{ mt: 3, border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Output Details: {selectedOutput.id}
              </Typography>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => setSelectedOutput(null)}
              >
                Close
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Input Prompt</Typography>
                <Typography variant="body2" paragraph>"{selectedOutput.prompt}"</Typography>
                
                <Typography variant="subtitle2" gutterBottom>Generated Output</Typography>
                <Typography variant="body2" paragraph>"{selectedOutput.output_text}"</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Performance Metrics</Typography>
                <Typography variant="body2">Processing Time: {formatTime(selectedOutput.processing_time_ms)}</Typography>
                <Typography variant="body2">Confidence Score: {selectedOutput.confidence_score}%</Typography>
                <Typography variant="body2">Token Count: {selectedOutput.token_count}</Typography>
                <Typography variant="body2">Cost: ${selectedOutput.cost_usd}</Typography>
                
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Quality Assurance</Typography>
                <Typography variant="body2">QA Status: {selectedOutput.qa_reviewed ? 'Reviewed' : 'Pending Review'}</Typography>
                <Typography variant="body2">QA Rating: {selectedOutput.qa_rating || 'Not rated'}/5</Typography>
                <Typography variant="body2">Safety Score: {selectedOutput.safety_score}/100</Typography>
                <Typography variant="body2">Flagged: {selectedOutput.flagged_for_review ? 'Yes' : 'No'}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          🚀 Ready to monitor your AI outputs?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          The Recent AI Output system provides comprehensive monitoring, quality assurance, 
          and performance analytics for all AI-generated content in real-time.
        </Typography>
        <Box display="flex" gap={2} justifyContent="center">
          <Button 
            variant="contained" 
            size="large"
            startIcon={<SmartToyIcon />}
          >
            View AI Outputs
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            startIcon={<AnalyticsIcon />}
          >
            QA Dashboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RecentAIOutputDemo; 