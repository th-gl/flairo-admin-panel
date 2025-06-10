import React from "react";
import ServiceList from "../page-view/service-list";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import { QA_STATS, AI_OUTPUT_TYPES, OUTPUT_STATUS, AI_MODELS } from "@/__fakeData__/aiOutputs";
import Chip from "@mui/material/Chip";
import { Paragraph } from "@/components/typography";
import FlexBox from "@/components/flexbox/FlexBox";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * AIOutputQADemo Component
 * 
 * This demo component showcases the AI output QA system where:
 * 1. QA team can review recent AI outputs for quality assurance
 * 2. Monitor AI model performance and success rates
 * 3. Track processing times and confidence scores
 * 4. Review and rate AI outputs for continuous improvement
 * 5. Flag problematic outputs for further investigation
 * 6. Analyze trends in AI performance across different models
 * 7. Monitor safety and bias scores for responsible AI usage
 * 
 * Features:
 * - Real-time AI output monitoring
 * - Quality assurance workflow
 * - Performance analytics and trends
 * - Safety and bias detection
 * - Model comparison and optimization
 * - User feedback integration
 */

export default function AIOutputQADemo() {
  const { t } = useTranslation();

  const getStatusColor = (status) => {
    switch (status) {
      case OUTPUT_STATUS.SUCCESS:
        return "success";
      case OUTPUT_STATUS.PARTIAL_SUCCESS:
        return "warning";
      case OUTPUT_STATUS.ERROR:
        return "error";
      case OUTPUT_STATUS.TIMEOUT:
        return "error";
      case OUTPUT_STATUS.PROCESSING:
        return "info";
      case OUTPUT_STATUS.QUEUED:
        return "default";
      default:
        return "default";
    }
  };

  const getModelColor = (model) => {
    switch (model) {
      case AI_MODELS.GPT4:
        return "primary";
      case AI_MODELS.GPT35:
        return "info";
      case AI_MODELS.CLAUDE:
        return "secondary";
      case AI_MODELS.LLAMA:
        return "success";
      default:
        return "default";
    }
  };

  const getOutputTypeColor = (type) => {
    const colors = ["primary", "secondary", "success", "warning", "info"];
    const index = Object.values(AI_OUTPUT_TYPES).indexOf(type) % colors.length;
    return colors[index];
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Demo Instructions */}
      <Card sx={{ mb: 3, backgroundColor: "primary.50" }}>
        <CardContent>
          <Typography variant="h6" color="primary.main" gutterBottom>
            {t("AI Output QA Monitoring System")}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {t("This system helps QA teams monitor and review AI outputs for quality assurance:")}
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: "text.secondary" }}>
            <li>{t("Review recent AI outputs with detailed performance metrics")}</li>
            <li>{t("Monitor AI model success rates and processing times")}</li>
            <li>{t("Assess confidence scores and quality ratings")}</li>
            <li>{t("Flag outputs for review and provide feedback")}</li>
            <li>{t("Track safety, toxicity, and bias scores")}</li>
            <li>{t("Compare performance across different AI models")}</li>
            <li>{t("Analyze user satisfaction and improvement areas")}</li>
          </Box>
          <Typography variant="body2" color="info.main" sx={{ mt: 2, fontWeight: 600 }}>
            {t("Click 'Demo Data' to view AI outputs, then use Actions (⋮) to view details or perform QA review!")}
          </Typography>
        </CardContent>
      </Card>

      {/* QA Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main" fontWeight="bold">
                {QA_STATS.totalOutputs}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("Total AI Outputs")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <FlexBox flexDirection="column" alignItems="center" gap={1}>
                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={QA_STATS.successRate}
                    size={60}
                    thickness={4}
                    color="success"
                  />
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h6" color="success.main" fontWeight="bold">
                      {QA_STATS.successRate}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {t("Success Rate")}
                </Typography>
              </FlexBox>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {QA_STATS.qaReviewedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("QA Reviewed")}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(QA_STATS.qaReviewedCount / QA_STATS.totalOutputs) * 100}
                sx={{ mt: 1 }}
                color="warning"
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main" fontWeight="bold">
                {QA_STATS.avgProcessingTime}ms
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("Avg Processing Time")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional QA Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("Quality Metrics")}
              </Typography>
              <FlexBox flexDirection="column" gap={2}>
                <FlexBox justifyContent="space-between" alignItems="center">
                  <Paragraph fontSize={14}>{t("Avg Confidence")}:</Paragraph>
                  <Typography variant="h6" color="primary.main">
                    {QA_STATS.avgConfidenceScore}%
                  </Typography>
                </FlexBox>
                <FlexBox justifyContent="space-between" alignItems="center">
                  <Paragraph fontSize={14}>{t("Avg QA Rating")}:</Paragraph>
                  <Typography variant="h6" color="secondary.main">
                    {QA_STATS.avgQaRating}/5
                  </Typography>
                </FlexBox>
                <FlexBox justifyContent="space-between" alignItems="center">
                  <Paragraph fontSize={14}>{t("Flagged for Review")}:</Paragraph>
                  <Typography variant="h6" color="error.main">
                    {QA_STATS.flaggedForReview}
                  </Typography>
                </FlexBox>
              </FlexBox>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("Usage Analytics")}
              </Typography>
              <FlexBox flexDirection="column" gap={2}>
                <FlexBox justifyContent="space-between" alignItems="center">
                  <Paragraph fontSize={14}>{t("Unique Users")}:</Paragraph>
                  <Typography variant="h6" color="info.main">
                    {QA_STATS.uniqueUsers}
                  </Typography>
                </FlexBox>
                <FlexBox justifyContent="space-between" alignItems="center">
                  <Paragraph fontSize={14}>{t("Total Cost")}:</Paragraph>
                  <Typography variant="h6" color="success.main">
                    ${QA_STATS.totalCost}
                  </Typography>
                </FlexBox>
                <FlexBox justifyContent="space-between" alignItems="center">
                  <Paragraph fontSize={14}>{t("Most Used Model")}:</Paragraph>
                  <Chip
                    label={QA_STATS.mostUsedModel}
                    size="small"
                    color={getModelColor(QA_STATS.mostUsedModel)}
                  />
                </FlexBox>
              </FlexBox>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("QA Workflow Status")}
              </Typography>
              <FlexBox flexDirection="column" gap={2}>
                <Box>
                  <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
                    <Paragraph fontSize={14}>{t("Reviewed")}:</Paragraph>
                    <Paragraph fontSize={14}>
                      {Math.round((QA_STATS.qaReviewedCount / QA_STATS.totalOutputs) * 100)}%
                    </Paragraph>
                  </FlexBox>
                  <LinearProgress
                    variant="determinate"
                    value={(QA_STATS.qaReviewedCount / QA_STATS.totalOutputs) * 100}
                    color="success"
                  />
                </Box>
                <Box>
                  <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
                    <Paragraph fontSize={14}>{t("Pending Review")}:</Paragraph>
                    <Paragraph fontSize={14}>
                      {Math.round(((QA_STATS.totalOutputs - QA_STATS.qaReviewedCount) / QA_STATS.totalOutputs) * 100)}%
                    </Paragraph>
                  </FlexBox>
                  <LinearProgress
                    variant="determinate"
                    value={((QA_STATS.totalOutputs - QA_STATS.qaReviewedCount) / QA_STATS.totalOutputs) * 100}
                    color="warning"
                  />
                </Box>
                <Box>
                  <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
                    <Paragraph fontSize={14}>{t("Flagged")}:</Paragraph>
                    <Paragraph fontSize={14}>
                      {Math.round((QA_STATS.flaggedForReview / QA_STATS.totalOutputs) * 100)}%
                    </Paragraph>
                  </FlexBox>
                  <LinearProgress
                    variant="determinate"
                    value={(QA_STATS.flaggedForReview / QA_STATS.totalOutputs) * 100}
                    color="error"
                  />
                </Box>
              </FlexBox>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Output Types & Models Legend */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("AI Output Types")}
              </Typography>
              <FlexBox gap={1} flexWrap="wrap">
                {Object.values(AI_OUTPUT_TYPES).map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    color={getOutputTypeColor(type)}
                    size="small"
                  />
                ))}
              </FlexBox>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("AI Models & Status")}
              </Typography>
              <FlexBox flexDirection="column" gap={2}>
                <Box>
                  <Paragraph fontSize={14} gutterBottom>{t("Available Models")}:</Paragraph>
                  <FlexBox gap={1} flexWrap="wrap">
                    {Object.values(AI_MODELS).map((model) => (
                      <Chip
                        key={model}
                        label={model}
                        color={getModelColor(model)}
                        size="small"
                      />
                    ))}
                  </FlexBox>
                </Box>
                <Box>
                  <Paragraph fontSize={14} gutterBottom>{t("Output Status")}:</Paragraph>
                  <FlexBox gap={1} flexWrap="wrap">
                    {Object.values(OUTPUT_STATUS).map((status) => (
                      <Chip
                        key={status}
                        label={status}
                        color={getStatusColor(status)}
                        size="small"
                      />
                    ))}
                  </FlexBox>
                </Box>
              </FlexBox>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* AI Output Table */}
      <ServiceList />
    </Box>
  );
} 