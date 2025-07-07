import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  LinearProgress,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import { Paragraph } from '@/components/typography';
import FlexBox from '@/components/flexbox/FlexBox';
import { useTranslation } from 'react-i18next';
import {
  AI_PROMPTS_LIST,
  PROMPT_CATEGORIES,
  PROMPT_STATUS,
  AI_MODELS_FOR_PROMPTS,
  PROMPT_COMPLEXITY,
  PROMPT_STATS
} from '@/__fakeData__/aiPrompts';

const COLORS = ['#1976d2', '#2e7d32', '#ed6c02', '#9c27b0', '#d32f2f', '#0288d1', '#795548', '#e91e63'];

const AIPromptsDemo = () => {
  const { t } = useTranslation();
  const [openNewPromptDialog, setOpenNewPromptDialog] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Prepare chart data
  const categoryData = Object.values(PROMPT_CATEGORIES).map(category => ({
    name: category,
    count: AI_PROMPTS_LIST.filter(p => p.category === category).length,
    usage: AI_PROMPTS_LIST.filter(p => p.category === category).reduce((sum, p) => sum + p.usage_count, 0)
  }));

  const statusData = Object.values(PROMPT_STATUS).map(status => ({
    name: status,
    value: AI_PROMPTS_LIST.filter(p => p.status === status).length
  }));

  const modelUsageData = Object.values(AI_MODELS_FOR_PROMPTS).map(model => ({
    name: model,
    usage: AI_PROMPTS_LIST.filter(p => p.recommended_model === model).reduce((sum, p) => sum + p.usage_count, 0),
    avgRating: (AI_PROMPTS_LIST.filter(p => p.recommended_model === model).reduce((sum, p) => sum + parseFloat(p.user_rating), 0) / 
               AI_PROMPTS_LIST.filter(p => p.recommended_model === model).length).toFixed(1)
  }));

  const complexityData = Object.values(PROMPT_COMPLEXITY).map(complexity => ({
    name: complexity,
    count: AI_PROMPTS_LIST.filter(p => p.complexity === complexity).length,
    avgSuccessRate: Math.round(AI_PROMPTS_LIST.filter(p => p.complexity === complexity).reduce((sum, p) => sum + p.success_rate, 0) / 
                              AI_PROMPTS_LIST.filter(p => p.complexity === complexity).length)
  }));

  // Usage trend data (mock data for last 7 days)
  const usageTrendData = [
    { date: '7d ago', usage: 1200, newPrompts: 2 },
    { date: '6d ago', usage: 1350, newPrompts: 1 },
    { date: '5d ago', usage: 1100, newPrompts: 3 },
    { date: '4d ago', usage: 1450, newPrompts: 0 },
    { date: '3d ago', usage: 1600, newPrompts: 2 },
    { date: '2d ago', usage: 1400, newPrompts: 1 },
    { date: 'Today', usage: 1750, newPrompts: 4 }
  ];

  const topPerformingPrompts = AI_PROMPTS_LIST
    .sort((a, b) => b.usage_count - a.usage_count)
    .slice(0, 5);

  const recentPrompts = AI_PROMPTS_LIST
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 5);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <FlexBox justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {t("AI Prompts Analytics")}
          </Typography>
          <Paragraph color="text.secondary">
            {t("Comprehensive overview of your AI prompt library performance")}
          </Paragraph>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewPromptDialog(true)}
        >
          {t("Create New Prompt")}
        </Button>
      </FlexBox>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h3" color="primary.main">
              {PROMPT_STATS.totalPrompts}
            </Typography>
            <Typography color="text.secondary">Total Prompts</Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              +{PROMPT_STATS.draftPrompts} drafts
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h3" color="success.main">
              {PROMPT_STATS.totalUsage.toLocaleString()}
            </Typography>
            <Typography color="text.secondary">Total Usage</Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              {PROMPT_STATS.avgSuccessRate}% success rate
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <StarIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h3" color="warning.main">
              {PROMPT_STATS.avgRating}
            </Typography>
            <Typography color="text.secondary">Average Rating</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              across all prompts
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Box sx={{ color: 'info.main', mb: 1 }}>💰</Box>
            <Typography variant="h3" color="info.main">
              ${PROMPT_STATS.totalCost}
            </Typography>
            <Typography color="text.secondary">Total Cost</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              this month
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        {/* Category Distribution */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              {t("Prompts by Category")}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="count" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Status Distribution */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              {t("Status Distribution")}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Usage Trend */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, height: 400 }}>
            <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                {t("Usage Trends")}
              </Typography>
              <FormControl size="small">
                <Select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                >
                  <MenuItem value="7d">Last 7 days</MenuItem>
                  <MenuItem value="30d">Last 30 days</MenuItem>
                  <MenuItem value="90d">Last 90 days</MenuItem>
                </Select>
              </FormControl>
            </FlexBox>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="usage" stroke="#1976d2" strokeWidth={2} />
                <Line type="monotone" dataKey="newPrompts" stroke="#2e7d32" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Data Tables Section */}
      <Grid container spacing={3} mb={4}>
        {/* Top Performing Prompts */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t("Top Performing Prompts")}
            </Typography>
            <Box>
              {topPerformingPrompts.map((prompt, index) => (
                <Box key={prompt.id} sx={{ mb: 2, pb: 2, borderBottom: index < 4 ? '1px solid #e0e0e0' : 'none' }}>
                  <FlexBox justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {prompt.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {prompt.category}
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="h6" color="primary.main">
                        {prompt.usage_count.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        uses
                      </Typography>
                    </Box>
                  </FlexBox>
                  <Box sx={{ mt: 1 }}>
                    <FlexBox gap={1}>
                      <Chip label={`${prompt.success_rate}% success`} size="small" color="success" />
                      <Chip label={`⭐ ${prompt.user_rating}`} size="small" />
                    </FlexBox>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t("Recent Prompts")}
            </Typography>
            <Box>
              {recentPrompts.map((prompt, index) => (
                <Box key={prompt.id} sx={{ mb: 2, pb: 2, borderBottom: index < 4 ? '1px solid #e0e0e0' : 'none' }}>
                  <FlexBox justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {prompt.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        by {prompt.author}
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Chip
                        label={prompt.status}
                        size="small"
                        color={prompt.status === 'Active' ? 'success' : 'default'}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        v{prompt.version}
                      </Typography>
                    </Box>
                  </FlexBox>
                  <Box sx={{ mt: 1 }}>
                    <FlexBox gap={1} alignItems="center">
                      <IconButton size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <PlayArrowIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(prompt.updated_at).toLocaleDateString()}
                      </Typography>
                    </FlexBox>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Model Performance Comparison */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t("AI Model Performance Comparison")}
            </Typography>
            <Grid container spacing={2}>
              {modelUsageData.map((model, index) => (
                <Grid item xs={12} sm={6} md={4} key={model.name}>
                  <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      {model.name}
                    </Typography>
                    <Typography variant="h5" color="primary.main">
                      {model.usage.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      total uses
                    </Typography>
                    <FlexBox alignItems="center" gap={1}>
                      <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                      <Typography variant="body2">
                        {model.avgRating} avg rating
                      </Typography>
                    </FlexBox>
                    <LinearProgress
                      variant="determinate"
                      value={(model.usage / Math.max(...modelUsageData.map(m => m.usage))) * 100}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>

      {/* New Prompt Dialog */}
      <Dialog
        open={openNewPromptDialog}
        onClose={() => setOpenNewPromptDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{t("Create New AI Prompt")}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label={t("Prompt Name")}
              margin="normal"
              placeholder="Enter a descriptive name for your prompt"
            />
            <TextField
              fullWidth
              label={t("Description")}
              margin="normal"
              multiline
              rows={2}
              placeholder="Describe what this prompt does and when to use it"
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>{t("Category")}</InputLabel>
                <Select label={t("Category")}>
                  {Object.values(PROMPT_CATEGORIES).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>{t("Complexity")}</InputLabel>
                <Select label={t("Complexity")}>
                  {Object.values(PROMPT_COMPLEXITY).map((complexity) => (
                    <MenuItem key={complexity} value={complexity}>
                      {complexity}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              label={t("Prompt Template")}
              margin="normal"
              multiline
              rows={6}
              placeholder="Enter your prompt template. Use {variable_name} for dynamic content."
              sx={{ fontFamily: 'monospace' }}
            />
            <TextField
              fullWidth
              label={t("Tags")}
              margin="normal"
              placeholder="Enter tags separated by commas"
              helperText="Tags help organize and find prompts quickly"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewPromptDialog(false)}>
            {t("Cancel")}
          </Button>
          <Button variant="contained">
            {t("Create Prompt")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AIPromptsDemo; 