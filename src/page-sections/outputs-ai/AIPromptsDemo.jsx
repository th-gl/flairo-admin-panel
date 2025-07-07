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
  Divider,
  Rating
} from '@mui/material';
import {
  Edit as EditIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon,
  CheckCircle as CheckCircleIcon,
  PlayArrow as PlayArrowIcon,
  ContentCopy as ContentCopyIcon,
  TrendingUp as TrendingUpIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';
import {
  AI_PROMPTS_LIST,
  PROMPT_STATS,
  PROMPT_STATUS,
  PROMPT_CATEGORIES
} from '@/__fakeData__/aiPrompts';

const AIPromptsDemo = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  // Helper functions
  const getStatusColor = (status) => {
    const colors = {
      [PROMPT_STATUS.ACTIVE]: 'success',
      [PROMPT_STATUS.DRAFT]: 'warning',
      [PROMPT_STATUS.TESTING]: 'info',
      [PROMPT_STATUS.ARCHIVED]: 'default',
      [PROMPT_STATUS.DEPRECATED]: 'error'
    };
    return colors[status] || 'default';
  };

  const getCategoryColor = (category) => {
    const colors = {
      [PROMPT_CATEGORIES.CONTENT_GENERATION]: 'primary',
      [PROMPT_CATEGORIES.CUSTOMER_SUPPORT]: 'success',
      [PROMPT_CATEGORIES.DATA_ANALYSIS]: 'warning',
      [PROMPT_CATEGORIES.CODE_GENERATION]: 'secondary',
      [PROMPT_CATEGORIES.TRANSLATION]: 'error',
      [PROMPT_CATEGORIES.SUMMARIZATION]: 'info'
    };
    return colors[category] || 'default';
  };

  const truncateText = (text, length = 100) => {
    return text?.length > length ? `${text.substring(0, length)}...` : text;
  };

  // Get featured prompts for display
  const featuredPrompts = AI_PROMPTS_LIST.slice(0, 8);

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        ✏️ AI Prompts Management Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Create, test, and manage AI prompts with version control and performance analytics
      </Typography>

      {/* Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <CodeIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {PROMPT_STATS.totalPrompts}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Prompts
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    {PROMPT_STATS.activePrompts} active
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
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {PROMPT_STATS.avgSuccessRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Success Rate
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    across all prompts
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
                    {PROMPT_STATS.totalUsage.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Usage
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    times executed
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
                  <PsychologyIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {PROMPT_STATS.avgRating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Rating
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    user feedback
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* AI Prompts List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Featured AI Prompts
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<EditIcon />}
                  size="small"
                >
                  Manage All Prompts
                </Button>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Prompt Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Usage</TableCell>
                      <TableCell>Success Rate</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {featuredPrompts.map((prompt) => (
                      <TableRow 
                        key={prompt.id} 
                        hover
                        onClick={() => setSelectedPrompt(prompt)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {prompt.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {truncateText(prompt.description, 50)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={prompt.category}
                            size="small"
                            color={getCategoryColor(prompt.category)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {prompt.usage_count.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2"
                            color={prompt.success_rate >= 90 ? 'success.main' : 'text.primary'}
                            fontWeight="medium"
                          >
                            {prompt.success_rate}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Rating
                              size="small"
                              value={parseFloat(prompt.user_rating)}
                              readOnly
                              precision={0.1}
                            />
                            <Typography variant="caption">
                              ({prompt.user_rating})
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={prompt.status}
                            size="small"
                            color={getStatusColor(prompt.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <Button size="small" variant="outlined" startIcon={<EditIcon />}>
                              Edit
                            </Button>
                            <Button size="small" variant="text" startIcon={<PlayArrowIcon />}>
                              Test
                            </Button>
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

        {/* Prompt Management Features */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                🎯 Prompt Management Features
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Smart Prompt Editor"
                    secondary="Create and edit prompts with syntax highlighting"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Version Control"
                    secondary="Track changes and manage prompt versions"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Performance Testing"
                    secondary="Test prompts with real data and AI models"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Usage Analytics"
                    secondary="Monitor prompt performance and success rates"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Template Library"
                    secondary="Browse and use pre-built prompt templates"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📊 Category Distribution
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Content Generation: 35%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={35} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Customer Support: 25%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={25} 
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Code Generation: 20%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={20} 
                  color="secondary"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Most Popular Prompts:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                <Chip label="Blog Writer" size="small" variant="outlined" color="primary" />
                <Chip label="Email Template" size="small" variant="outlined" color="success" />
                <Chip label="Code Helper" size="small" variant="outlined" color="secondary" />
                <Chip label="Summarizer" size="small" variant="outlined" color="info" />
              </Box>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Quick Actions:
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Button size="small" variant="outlined" startIcon={<EditIcon />} fullWidth>
                  Create New Prompt
                </Button>
                <Button size="small" variant="outlined" startIcon={<ContentCopyIcon />} fullWidth>
                  Import Template
                </Button>
                <Button size="small" variant="outlined" startIcon={<PlayArrowIcon />} fullWidth>
                  Test Playground
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Selected Prompt Details */}
      {selectedPrompt && (
        <Card sx={{ mt: 3, border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Prompt Details: {selectedPrompt.name}
              </Typography>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => setSelectedPrompt(null)}
              >
                Close
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Prompt Template</Typography>
                <Box
                  sx={{
                    backgroundColor: '#f5f5f5',
                    padding: 2,
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    whiteSpace: 'pre-wrap',
                    maxHeight: 200,
                    overflow: 'auto'
                  }}
                >
                  {selectedPrompt.prompt_text}
                </Box>
                
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Variables</Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {selectedPrompt.variables?.map((variable, index) => (
                    <Chip key={index} label={`{${variable}}`} size="small" variant="outlined" />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Performance Metrics</Typography>
                <Typography variant="body2">Usage Count: {selectedPrompt.usage_count.toLocaleString()}</Typography>
                <Typography variant="body2">Success Rate: {selectedPrompt.success_rate}%</Typography>
                <Typography variant="body2">Avg Response Time: {selectedPrompt.avg_response_time}ms</Typography>
                <Typography variant="body2">User Rating: {selectedPrompt.user_rating}/5</Typography>
                
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Tags & Use Cases</Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
                  {selectedPrompt.tags?.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" color="primary" />
                  ))}
                </Box>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {selectedPrompt.use_cases?.map((useCase, index) => (
                    <Chip key={index} label={useCase} size="small" variant="outlined" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          🚀 Ready to create powerful AI prompts?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          The AI Prompts management system provides comprehensive tools for creating, 
          testing, and optimizing prompts with version control and performance analytics.
        </Typography>
        
        {/* Selection State Demo */}
        <Card sx={{ mb: 3, p: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            ✨ Enhanced Selection Experience
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" alignItems="center">
            <Chip 
              icon={<CheckCircleIcon />}
              label="Visual selection feedback"
              color="primary"
              variant="outlined"
            />
            <Chip 
              label="Professional toolbar"
              color="success"
              variant="outlined"
            />
            <Chip 
              label="Bulk operations"
              color="info"
              variant="outlined"
            />
            <Chip 
              label="Smooth animations"
              color="warning"
              variant="outlined"
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Select multiple prompts to see the improved selection toolbar with delete functionality
          </Typography>
        </Card>
        
        <Box display="flex" gap={2} justifyContent="center">
          <Button 
            variant="contained" 
            size="large"
            startIcon={<EditIcon />}
          >
            Create New Prompt
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            startIcon={<PlayArrowIcon />}
          >
            Test Playground
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AIPromptsDemo; 