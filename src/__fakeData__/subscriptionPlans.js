// Subscription Plan Types and Categories
export const PLAN_TYPES = {
  FREE: 'Free',
  BASIC: 'Basic',
  PRO: 'Pro',
  ENTERPRISE: 'Enterprise',
  CUSTOM: 'Custom'
};

export const PLAN_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DRAFT: 'Draft',
  ARCHIVED: 'Archived',
  COMING_SOON: 'Coming Soon'
};

export const BILLING_CYCLES = {
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  QUARTERLY: 'Quarterly',
  YEARLY: 'Yearly',
  LIFETIME: 'Lifetime'
};

export const PLAN_FEATURES = {
  WEEKLY_DECODES: 'Weekly Decodes',
  AI_MODELS: 'AI Models Access',
  PRIORITY_SUPPORT: 'Priority Support',
  CUSTOM_PROMPTS: 'Custom Prompts',
  API_ACCESS: 'API Access',
  TEAM_COLLABORATION: 'Team Collaboration',
  ADVANCED_ANALYTICS: 'Advanced Analytics',
  WHITE_LABEL: 'White Label',
  CUSTOM_INTEGRATIONS: 'Custom Integrations',
  DEDICATED_MANAGER: 'Dedicated Account Manager'
};

// Generate realistic subscription plan data
const generateSubscriptionPlanData = () => {
  const plans = [];
  
  const planTemplates = [
    {
      name: 'Free Starter',
      type: PLAN_TYPES.FREE,
      description: 'Perfect for trying out our AI decoding capabilities',
      longDescription: 'Get started with our AI decoding platform at no cost. Perfect for individuals and small projects who want to explore the possibilities of AI-powered content analysis.',
      price: 0,
      originalPrice: 0,
      billingCycle: BILLING_CYCLES.MONTHLY,
      weeklyDecodeLimit: 5,
      monthlyDecodeLimit: 20,
      features: [
        { name: PLAN_FEATURES.WEEKLY_DECODES, value: '5 per week', included: true },
        { name: PLAN_FEATURES.AI_MODELS, value: 'Basic models only', included: true },
        { name: PLAN_FEATURES.PRIORITY_SUPPORT, value: 'Community support', included: false },
        { name: PLAN_FEATURES.CUSTOM_PROMPTS, value: 'Pre-built templates', included: true },
        { name: PLAN_FEATURES.API_ACCESS, value: 'Limited API calls', included: false }
      ],
      buttonText: 'Get Started Free',
      buttonSubtext: 'No credit card required',
      popularBadge: false,
      customizable: {
        weeklyDecodeLimit: true,
        description: true,
        buttonText: true,
        features: true
      }
    },
    {
      name: 'Professional',
      type: PLAN_TYPES.PRO,
      description: 'Ideal for professionals and growing businesses',
      longDescription: 'Unlock the full potential of AI decoding with advanced features, priority support, and increased limits. Perfect for professionals and growing businesses.',
      price: 29.99,
      originalPrice: 39.99,
      billingCycle: BILLING_CYCLES.MONTHLY,
      weeklyDecodeLimit: 100,
      monthlyDecodeLimit: 400,
      features: [
        { name: PLAN_FEATURES.WEEKLY_DECODES, value: '100 per week', included: true },
        { name: PLAN_FEATURES.AI_MODELS, value: 'All AI models', included: true },
        { name: PLAN_FEATURES.PRIORITY_SUPPORT, value: 'Email & chat support', included: true },
        { name: PLAN_FEATURES.CUSTOM_PROMPTS, value: 'Create custom prompts', included: true },
        { name: PLAN_FEATURES.API_ACCESS, value: '10,000 API calls/month', included: true },
        { name: PLAN_FEATURES.ADVANCED_ANALYTICS, value: 'Detailed analytics', included: true }
      ],
      buttonText: 'Start Pro Trial',
      buttonSubtext: '14-day free trial',
      popularBadge: true,
      customizable: {
        weeklyDecodeLimit: true,
        description: true,
        buttonText: true,
        features: true,
        price: true
      }
    },
    {
      name: 'Enterprise',
      type: PLAN_TYPES.ENTERPRISE,
      description: 'Advanced features for large teams and organizations',
      longDescription: 'Enterprise-grade solution with unlimited decoding, custom integrations, dedicated support, and advanced security features for large organizations.',
      price: 199.99,
      originalPrice: 299.99,
      billingCycle: BILLING_CYCLES.MONTHLY,
      weeklyDecodeLimit: -1, // Unlimited
      monthlyDecodeLimit: -1, // Unlimited
      features: [
        { name: PLAN_FEATURES.WEEKLY_DECODES, value: 'Unlimited', included: true },
        { name: PLAN_FEATURES.AI_MODELS, value: 'All models + Beta access', included: true },
        { name: PLAN_FEATURES.PRIORITY_SUPPORT, value: '24/7 phone & chat', included: true },
        { name: PLAN_FEATURES.CUSTOM_PROMPTS, value: 'Unlimited custom prompts', included: true },
        { name: PLAN_FEATURES.API_ACCESS, value: 'Unlimited API calls', included: true },
        { name: PLAN_FEATURES.TEAM_COLLABORATION, value: 'Team management', included: true },
        { name: PLAN_FEATURES.ADVANCED_ANALYTICS, value: 'Enterprise analytics', included: true },
        { name: PLAN_FEATURES.WHITE_LABEL, value: 'White label options', included: true },
        { name: PLAN_FEATURES.CUSTOM_INTEGRATIONS, value: 'Custom integrations', included: true },
        { name: PLAN_FEATURES.DEDICATED_MANAGER, value: 'Dedicated account manager', included: true }
      ],
      buttonText: 'Contact Sales',
      buttonSubtext: 'Custom pricing available',
      popularBadge: false,
      customizable: {
        weeklyDecodeLimit: true,
        description: true,
        buttonText: true,
        features: true,
        price: true
      }
    },
    {
      name: 'Basic',
      type: PLAN_TYPES.BASIC,
      description: 'Perfect for individuals and small teams',
      longDescription: 'Step up from free with more decodes, basic AI models, and email support. Ideal for individuals and small teams getting started with AI decoding.',
      price: 9.99,
      originalPrice: 14.99,
      billingCycle: BILLING_CYCLES.MONTHLY,
      weeklyDecodeLimit: 25,
      monthlyDecodeLimit: 100,
      features: [
        { name: PLAN_FEATURES.WEEKLY_DECODES, value: '25 per week', included: true },
        { name: PLAN_FEATURES.AI_MODELS, value: 'Standard models', included: true },
        { name: PLAN_FEATURES.PRIORITY_SUPPORT, value: 'Email support', included: true },
        { name: PLAN_FEATURES.CUSTOM_PROMPTS, value: '10 custom prompts', included: true },
        { name: PLAN_FEATURES.API_ACCESS, value: '1,000 API calls/month', included: true }
      ],
      buttonText: 'Choose Basic',
      buttonSubtext: 'Upgrade anytime',
      popularBadge: false,
      customizable: {
        weeklyDecodeLimit: true,
        description: true,
        buttonText: true,
        features: true,
        price: true
      }
    },
    {
      name: 'Student',
      type: PLAN_TYPES.BASIC,
      description: 'Special pricing for students and educators',
      longDescription: 'Discounted access to our Professional features for verified students and educators. All the power of Pro at a fraction of the cost.',
      price: 14.99,
      originalPrice: 29.99,
      billingCycle: BILLING_CYCLES.MONTHLY,
      weeklyDecodeLimit: 75,
      monthlyDecodeLimit: 300,
      features: [
        { name: PLAN_FEATURES.WEEKLY_DECODES, value: '75 per week', included: true },
        { name: PLAN_FEATURES.AI_MODELS, value: 'All AI models', included: true },
        { name: PLAN_FEATURES.PRIORITY_SUPPORT, value: 'Email support', included: true },
        { name: PLAN_FEATURES.CUSTOM_PROMPTS, value: 'Unlimited custom prompts', included: true },
        { name: PLAN_FEATURES.API_ACCESS, value: '5,000 API calls/month', included: true },
        { name: PLAN_FEATURES.ADVANCED_ANALYTICS, value: 'Basic analytics', included: true }
      ],
      buttonText: 'Verify Student Status',
      buttonSubtext: 'Education verification required',
      popularBadge: false,
      customizable: {
        weeklyDecodeLimit: true,
        description: true,
        buttonText: true,
        features: true,
        price: true
      }
    }
  ];

  const authors = [
    'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Wilson',
    'Lisa Anderson', 'James Thompson', 'Maria Garcia', 'Robert Brown'
  ];

  const statuses = Object.values(PLAN_STATUS);
  const billingCycles = Object.values(BILLING_CYCLES);

  // Generate plans based on templates
  planTemplates.forEach((template, templateIndex) => {
    // Create multiple versions/variations of each plan
    const versionsCount = Math.floor(Math.random() * 3) + 1; // 1-3 versions
    
    for (let version = 1; version <= versionsCount; version++) {
      const isCurrentVersion = version === versionsCount;
      const planId = `plan_${templateIndex + 1}_v${version}`;
      
      const baseTime = new Date();
      const daysAgo = Math.floor(Math.random() * 60) + (versionsCount - version) * 30;
      const timestamp = new Date(baseTime.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      
      // Add some variation to pricing for different versions
      const priceVariation = version > 1 ? (Math.random() - 0.5) * 10 : 0;
      const adjustedPrice = Math.max(0, template.price + priceVariation);
      
      plans.push({
        id: planId,
        name: version > 1 ? `${template.name} v${version}` : template.name,
        slug: template.name.toLowerCase().replace(/\s+/g, '-') + (version > 1 ? `-v${version}` : ''),
        type: template.type,
        status: isCurrentVersion ? PLAN_STATUS.ACTIVE : PLAN_STATUS.ARCHIVED,
        
        // Pricing information
        price: adjustedPrice,
        originalPrice: template.originalPrice + priceVariation,
        currency: 'USD',
        billingCycle: template.billingCycle,
        
        // Content that can be customized
        description: template.description,
        longDescription: template.longDescription,
        buttonText: template.buttonText,
        buttonSubtext: template.buttonSubtext,
        
        // Decode limits (editable)
        weeklyDecodeLimit: template.weeklyDecodeLimit,
        monthlyDecodeLimit: template.monthlyDecodeLimit,
        dailyDecodeLimit: Math.floor(template.weeklyDecodeLimit / 7),
        yearlyDecodeLimit: template.monthlyDecodeLimit * 12,
        
        // Features
        features: template.features,
        
        // Visual elements
        popularBadge: template.popularBadge,
        badgeText: template.popularBadge ? 'Most Popular' : null,
        color: getPlanColor(template.type),
        icon: getPlanIcon(template.type),
        
        // Customization settings
        customizable: template.customizable,
        
        // Metadata
        version: `${version}.0`,
        isCurrentVersion: isCurrentVersion,
        author: authors[Math.floor(Math.random() * authors.length)],
        createdAt: timestamp.toISOString(),
        updatedAt: timestamp.toISOString(),
        lastModifiedBy: authors[Math.floor(Math.random() * authors.length)],
        
        // Usage statistics
        subscriberCount: Math.floor(Math.random() * 10000) + (template.popularBadge ? 5000 : 0),
        conversionRate: (Math.random() * 15 + 5).toFixed(2), // 5-20%
        churnRate: (Math.random() * 10 + 2).toFixed(2), // 2-12%
        avgLifetimeValue: (adjustedPrice * (Math.random() * 12 + 6)).toFixed(2), // 6-18 months
        
        // Analytics
        viewCount: Math.floor(Math.random() * 50000),
        clickCount: Math.floor(Math.random() * 10000),
        signupCount: Math.floor(Math.random() * 1000),
        
        // Trial settings
        trialDays: template.type === PLAN_TYPES.FREE ? 0 : Math.floor(Math.random() * 30) + 7,
        trialEnabled: template.type !== PLAN_TYPES.FREE,
        
        // Limits and quotas
        teamMemberLimit: template.type === PLAN_TYPES.ENTERPRISE ? -1 : Math.floor(Math.random() * 10) + 1,
        storageLimit: template.type === PLAN_TYPES.ENTERPRISE ? -1 : Math.floor(Math.random() * 100) + 10, // GB
        supportLevel: getSupportLevel(template.type),
        
        // Business logic
        autoRenewal: true,
        prorationEnabled: true,
        downgradePrevention: template.type === PLAN_TYPES.ENTERPRISE,
        
        // Promotional settings
        discountEligible: true,
        seasonalPromotion: Math.random() > 0.7,
        referralReward: template.type !== PLAN_TYPES.FREE ? (Math.random() * 50 + 10).toFixed(0) : 0,
        
        // Integration settings
        stripeProductId: `prod_${Math.random().toString(36).substr(2, 9)}`,
        stripePriceId: `price_${Math.random().toString(36).substr(2, 9)}`,
        webhookEnabled: true,
        
        // Advanced features flags
        advancedFeatures: {
          apiAccess: template.features.some(f => f.name === PLAN_FEATURES.API_ACCESS && f.included),
          whiteLabel: template.features.some(f => f.name === PLAN_FEATURES.WHITE_LABEL && f.included),
          customIntegrations: template.features.some(f => f.name === PLAN_FEATURES.CUSTOM_INTEGRATIONS && f.included),
          dedicatedSupport: template.features.some(f => f.name === PLAN_FEATURES.DEDICATED_MANAGER && f.included)
        }
      });
    }
  });

  return plans.sort((a, b) => a.price - b.price); // Sort by price ascending
};

// Helper functions
const getPlanColor = (type) => {
  const colors = {
    [PLAN_TYPES.FREE]: '#9e9e9e',
    [PLAN_TYPES.BASIC]: '#2196f3',
    [PLAN_TYPES.PRO]: '#4caf50',
    [PLAN_TYPES.ENTERPRISE]: '#9c27b0',
    [PLAN_TYPES.CUSTOM]: '#ff9800'
  };
  return colors[type] || '#666';
};

const getPlanIcon = (type) => {
  const icons = {
    [PLAN_TYPES.FREE]: '🆓',
    [PLAN_TYPES.BASIC]: '📦',
    [PLAN_TYPES.PRO]: '⭐',
    [PLAN_TYPES.ENTERPRISE]: '🏢',
    [PLAN_TYPES.CUSTOM]: '🎯'
  };
  return icons[type] || '📋';
};

const getSupportLevel = (type) => {
  const supportLevels = {
    [PLAN_TYPES.FREE]: 'Community',
    [PLAN_TYPES.BASIC]: 'Email',
    [PLAN_TYPES.PRO]: 'Email + Chat',
    [PLAN_TYPES.ENTERPRISE]: '24/7 Phone + Chat',
    [PLAN_TYPES.CUSTOM]: 'Dedicated Manager'
  };
  return supportLevels[type] || 'Community';
};

export const SUBSCRIPTION_PLANS_LIST = generateSubscriptionPlanData();

// Plan statistics
export const PLAN_STATS = {
  totalPlans: SUBSCRIPTION_PLANS_LIST.length,
  activePlans: SUBSCRIPTION_PLANS_LIST.filter(p => p.status === PLAN_STATUS.ACTIVE).length,
  draftPlans: SUBSCRIPTION_PLANS_LIST.filter(p => p.status === PLAN_STATUS.DRAFT).length,
  totalSubscribers: SUBSCRIPTION_PLANS_LIST.reduce((sum, p) => sum + p.subscriberCount, 0),
  avgConversionRate: (SUBSCRIPTION_PLANS_LIST.reduce((sum, p) => sum + parseFloat(p.conversionRate), 0) / SUBSCRIPTION_PLANS_LIST.length).toFixed(2),
  avgChurnRate: (SUBSCRIPTION_PLANS_LIST.reduce((sum, p) => sum + parseFloat(p.churnRate), 0) / SUBSCRIPTION_PLANS_LIST.length).toFixed(2),
  totalRevenue: SUBSCRIPTION_PLANS_LIST.reduce((sum, p) => sum + (p.price * p.subscriberCount), 0).toFixed(2),
  mostPopularPlan: SUBSCRIPTION_PLANS_LIST.reduce((a, b) => a.subscriberCount > b.subscriberCount ? a : b),
  avgWeeklyDecodes: Math.round(SUBSCRIPTION_PLANS_LIST.filter(p => p.weeklyDecodeLimit > 0).reduce((sum, p) => sum + p.weeklyDecodeLimit, 0) / SUBSCRIPTION_PLANS_LIST.filter(p => p.weeklyDecodeLimit > 0).length),
  totalWeeklyDecodes: SUBSCRIPTION_PLANS_LIST.reduce((sum, p) => sum + (p.weeklyDecodeLimit > 0 ? p.weeklyDecodeLimit * p.subscriberCount : 0), 0)
};

// Decode limit presets for easy management
export const DECODE_LIMIT_PRESETS = {
  MINIMAL: { weekly: 5, monthly: 20, daily: 1 },
  LIGHT: { weekly: 25, monthly: 100, daily: 4 },
  STANDARD: { weekly: 50, monthly: 200, daily: 7 },
  PROFESSIONAL: { weekly: 100, monthly: 400, daily: 14 },
  BUSINESS: { weekly: 250, monthly: 1000, daily: 36 },
  ENTERPRISE: { weekly: -1, monthly: -1, daily: -1 } // Unlimited
};

// Button text templates
export const BUTTON_TEXT_TEMPLATES = [
  'Get Started',
  'Start Free Trial',
  'Choose Plan',
  'Subscribe Now',
  'Contact Sales',
  'Upgrade Now',
  'Try Pro',
  'Get Premium',
  'Start Today',
  'Join Now'
];

// Feature templates for quick setup
export const FEATURE_TEMPLATES = {
  BASIC_FEATURES: [
    { name: PLAN_FEATURES.WEEKLY_DECODES, included: true },
    { name: PLAN_FEATURES.AI_MODELS, included: true },
    { name: PLAN_FEATURES.CUSTOM_PROMPTS, included: false }
  ],
  PROFESSIONAL_FEATURES: [
    { name: PLAN_FEATURES.WEEKLY_DECODES, included: true },
    { name: PLAN_FEATURES.AI_MODELS, included: true },
    { name: PLAN_FEATURES.PRIORITY_SUPPORT, included: true },
    { name: PLAN_FEATURES.CUSTOM_PROMPTS, included: true },
    { name: PLAN_FEATURES.API_ACCESS, included: true },
    { name: PLAN_FEATURES.ADVANCED_ANALYTICS, included: true }
  ],
  ENTERPRISE_FEATURES: [
    { name: PLAN_FEATURES.WEEKLY_DECODES, included: true },
    { name: PLAN_FEATURES.AI_MODELS, included: true },
    { name: PLAN_FEATURES.PRIORITY_SUPPORT, included: true },
    { name: PLAN_FEATURES.CUSTOM_PROMPTS, included: true },
    { name: PLAN_FEATURES.API_ACCESS, included: true },
    { name: PLAN_FEATURES.TEAM_COLLABORATION, included: true },
    { name: PLAN_FEATURES.ADVANCED_ANALYTICS, included: true },
    { name: PLAN_FEATURES.WHITE_LABEL, included: true },
    { name: PLAN_FEATURES.CUSTOM_INTEGRATIONS, included: true },
    { name: PLAN_FEATURES.DEDICATED_MANAGER, included: true }
  ]
}; 