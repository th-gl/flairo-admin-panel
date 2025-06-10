// AI Prompt Categories and Types
export const PROMPT_CATEGORIES = {
  CONTENT_GENERATION: 'Content Generation',
  CUSTOMER_SUPPORT: 'Customer Support',
  DATA_ANALYSIS: 'Data Analysis',
  CODE_GENERATION: 'Code Generation',
  TRANSLATION: 'Translation',
  SUMMARIZATION: 'Summarization',
  CLASSIFICATION: 'Classification',
  CREATIVE_WRITING: 'Creative Writing',
  PRODUCT_DESCRIPTION: 'Product Description',
  EMAIL_GENERATION: 'Email Generation'
};

export const PROMPT_STATUS = {
  ACTIVE: 'Active',
  DRAFT: 'Draft',
  ARCHIVED: 'Archived',
  TESTING: 'Testing',
  DEPRECATED: 'Deprecated'
};

export const AI_MODELS_FOR_PROMPTS = {
  GPT4: 'GPT-4',
  GPT35: 'GPT-3.5-Turbo',
  CLAUDE: 'Claude-3',
  LLAMA: 'LLaMA-2',
  CUSTOM: 'Custom Model'
};

export const PROMPT_COMPLEXITY = {
  SIMPLE: 'Simple',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert'
};

// Generate realistic AI prompt data
const generateAIPromptData = () => {
  const prompts = [];
  
  const promptTemplates = [
    {
      name: 'Product Description Generator',
      category: PROMPT_CATEGORIES.PRODUCT_DESCRIPTION,
      description: 'Generate compelling product descriptions for e-commerce',
      template: `You are an expert product copywriter. Create an engaging product description for the following product:

Product Name: {product_name}
Key Features: {features}
Target Audience: {audience}
Brand Voice: {brand_voice}

Requirements:
- Write in {tone} tone
- Highlight key benefits
- Include emotional appeal
- Optimize for SEO
- Keep under {word_limit} words

Generate a compelling product description that converts browsers into buyers.`,
      variables: ['product_name', 'features', 'audience', 'brand_voice', 'tone', 'word_limit']
    },
    {
      name: 'Customer Support Response',
      category: PROMPT_CATEGORIES.CUSTOMER_SUPPORT,
      description: 'Generate helpful customer support responses',
      template: `You are a friendly and professional customer support representative. 

Customer Issue: {customer_issue}
Customer Sentiment: {sentiment}
Product/Service: {product}
Company Policy: {policy}

Guidelines:
- Be empathetic and understanding
- Provide clear, actionable solutions
- Maintain professional tone
- Follow company policies
- Offer additional help if needed

Generate a helpful response that resolves the customer's concern.`,
      variables: ['customer_issue', 'sentiment', 'product', 'policy']
    },
    {
      name: 'Blog Content Creator',
      category: PROMPT_CATEGORIES.CONTENT_GENERATION,
      description: 'Create engaging blog posts and articles',
      template: `You are an expert content writer specializing in {industry} topics.

Topic: {topic}
Target Audience: {audience}
Content Type: {content_type}
SEO Keywords: {keywords}
Word Count: {word_count}

Requirements:
- Create an engaging introduction
- Use clear subheadings
- Include actionable insights
- Optimize for {keywords}
- Write in {tone} tone
- Include a compelling conclusion

Generate a comprehensive {content_type} that provides value to {audience}.`,
      variables: ['industry', 'topic', 'audience', 'content_type', 'keywords', 'word_count', 'tone']
    },
    {
      name: 'Email Marketing Campaign',
      category: PROMPT_CATEGORIES.EMAIL_GENERATION,
      description: 'Create effective email marketing campaigns',
      template: `You are an email marketing expert. Create a compelling email campaign:

Campaign Goal: {goal}
Target Audience: {audience}
Product/Service: {product}
Call-to-Action: {cta}
Brand Voice: {brand_voice}

Email Components:
- Subject Line (A/B test variations)
- Preview Text
- Email Body
- Clear CTA
- Personalization elements

Create an email that drives {goal} and resonates with {audience}.`,
      variables: ['goal', 'audience', 'product', 'cta', 'brand_voice']
    },
    {
      name: 'Code Documentation Generator',
      category: PROMPT_CATEGORIES.CODE_GENERATION,
      description: 'Generate comprehensive code documentation',
      template: `You are a senior software engineer. Generate comprehensive documentation for this code:

Programming Language: {language}
Code Type: {code_type}
Complexity Level: {complexity}

Code:
{code_snippet}

Documentation Requirements:
- Clear function/class descriptions
- Parameter explanations
- Return value details
- Usage examples
- Error handling notes
- Performance considerations

Generate professional documentation that helps other developers understand and use this code effectively.`,
      variables: ['language', 'code_type', 'complexity', 'code_snippet']
    },
    {
      name: 'Data Analysis Report',
      category: PROMPT_CATEGORIES.DATA_ANALYSIS,
      description: 'Analyze data and generate insights',
      template: `You are a data analyst. Analyze the following data and provide insights:

Dataset: {dataset_name}
Analysis Type: {analysis_type}
Key Metrics: {metrics}
Time Period: {time_period}
Business Context: {context}

Data Summary:
{data_summary}

Required Analysis:
- Trend identification
- Key insights
- Anomaly detection
- Recommendations
- Visual data representation suggestions
- Business impact assessment

Generate a comprehensive analysis report with actionable insights for {context}.`,
      variables: ['dataset_name', 'analysis_type', 'metrics', 'time_period', 'context', 'data_summary']
    }
  ];

  const authors = [
    'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Wilson',
    'Lisa Anderson', 'James Thompson', 'Maria Garcia', 'Robert Brown'
  ];

  const models = Object.values(AI_MODELS_FOR_PROMPTS);
  const statuses = Object.values(PROMPT_STATUS);
  const complexities = Object.values(PROMPT_COMPLEXITY);

  // Generate prompts based on templates
  promptTemplates.forEach((template, templateIndex) => {
    // Create multiple versions of each template
    const versionsCount = Math.floor(Math.random() * 4) + 2; // 2-5 versions
    
    for (let version = 1; version <= versionsCount; version++) {
      const isCurrentVersion = version === versionsCount;
      const promptId = `prompt_${templateIndex + 1}_v${version}`;
      
      const baseTime = new Date();
      const daysAgo = Math.floor(Math.random() * 30) + (versionsCount - version) * 7;
      const timestamp = new Date(baseTime.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      
      prompts.push({
        id: promptId,
        name: `${template.name} v${version}`,
        slug: template.name.toLowerCase().replace(/\s+/g, '-') + `-v${version}`,
        category: template.category,
        description: template.description,
        prompt_text: template.template,
        variables: template.variables,
        
        // Version and status information
        version: `${version}.0`,
        is_current_version: isCurrentVersion,
        parent_prompt_id: templateIndex === 0 ? null : `prompt_${templateIndex}_v1`,
        status: isCurrentVersion ? PROMPT_STATUS.ACTIVE : 
                version === versionsCount - 1 ? PROMPT_STATUS.TESTING : PROMPT_STATUS.ARCHIVED,
        
        // Model and complexity
        recommended_model: models[Math.floor(Math.random() * models.length)],
        complexity: complexities[Math.floor(Math.random() * complexities.length)],
        
        // Usage statistics
        usage_count: Math.floor(Math.random() * 1000) + (isCurrentVersion ? 500 : 0),
        success_rate: Math.floor(Math.random() * 30) + 70, // 70-100%
        avg_response_time: Math.floor(Math.random() * 3000) + 500, // 500-3500ms
        user_rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
        
        // Metadata
        author: authors[Math.floor(Math.random() * authors.length)],
        created_at: timestamp.toISOString(),
        updated_at: timestamp.toISOString(),
        last_used: isCurrentVersion ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : null,
        
        // Configuration
        max_tokens: Math.floor(Math.random() * 2000) + 500,
        temperature: (Math.random() * 0.8 + 0.2).toFixed(1), // 0.2-1.0
        top_p: (Math.random() * 0.5 + 0.5).toFixed(1), // 0.5-1.0
        
        // Tags and organization
        tags: generateRandomTags(template.category),
        use_cases: generateUseCases(template.category),
        
        // Performance metrics
        cost_per_use: (Math.random() * 0.10).toFixed(4),
        avg_output_length: Math.floor(Math.random() * 500) + 100,
        
        // Quality metrics
        coherence_score: Math.floor(Math.random() * 20) + 80, // 80-100
        relevance_score: Math.floor(Math.random() * 25) + 75, // 75-100
        creativity_score: Math.floor(Math.random() * 40) + 60, // 60-100
        
        // Access control
        is_public: Math.random() > 0.3, // 70% public
        team_id: Math.random() > 0.5 ? `team_${Math.floor(Math.random() * 5) + 1}` : null,
        
        // Usage tracking
        daily_usage_limit: Math.floor(Math.random() * 1000) + 100,
        monthly_usage: Math.floor(Math.random() * 5000),
        last_modified_by: authors[Math.floor(Math.random() * authors.length)]
      });
    }
  });

  // Add some additional standalone prompts
  const standalonePrompts = [
    {
      name: 'Text Summarizer',
      category: PROMPT_CATEGORIES.SUMMARIZATION,
      description: 'Summarize long text into key points',
      template: 'Please summarize the following text into {summary_length} key points: {text_to_summarize}'
    },
    {
      name: 'Language Translator',
      category: PROMPT_CATEGORIES.TRANSLATION,
      description: 'Translate text between languages',
      template: 'Translate the following text from {source_language} to {target_language}: {text_to_translate}'
    },
    {
      name: 'Creative Story Writer',
      category: PROMPT_CATEGORIES.CREATIVE_WRITING,
      description: 'Generate creative stories and narratives',
      template: 'Write a {genre} story about {main_character} in {setting}. Include {plot_elements} and make it {tone}.'
    }
  ];

  standalonePrompts.forEach((prompt, index) => {
    const promptId = `standalone_${index + 1}`;
    const timestamp = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000);
    
    prompts.push({
      id: promptId,
      name: prompt.name,
      slug: prompt.name.toLowerCase().replace(/\s+/g, '-'),
      category: prompt.category,
      description: prompt.description,
      prompt_text: prompt.template,
      variables: extractVariables(prompt.template),
      
      version: '1.0',
      is_current_version: true,
      parent_prompt_id: null,
      status: PROMPT_STATUS.ACTIVE,
      
      recommended_model: models[Math.floor(Math.random() * models.length)],
      complexity: complexities[Math.floor(Math.random() * complexities.length)],
      
      usage_count: Math.floor(Math.random() * 500),
      success_rate: Math.floor(Math.random() * 25) + 75,
      avg_response_time: Math.floor(Math.random() * 2000) + 300,
      user_rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      
      author: authors[Math.floor(Math.random() * authors.length)],
      created_at: timestamp.toISOString(),
      updated_at: timestamp.toISOString(),
      last_used: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      
      max_tokens: Math.floor(Math.random() * 1500) + 300,
      temperature: (Math.random() * 0.7 + 0.3).toFixed(1),
      top_p: (Math.random() * 0.3 + 0.7).toFixed(1),
      
      tags: generateRandomTags(prompt.category),
      use_cases: generateUseCases(prompt.category),
      
      cost_per_use: (Math.random() * 0.05).toFixed(4),
      avg_output_length: Math.floor(Math.random() * 300) + 50,
      
      coherence_score: Math.floor(Math.random() * 15) + 85,
      relevance_score: Math.floor(Math.random() * 20) + 80,
      creativity_score: Math.floor(Math.random() * 35) + 65,
      
      is_public: true,
      team_id: null,
      
      daily_usage_limit: Math.floor(Math.random() * 500) + 50,
      monthly_usage: Math.floor(Math.random() * 2000),
      last_modified_by: authors[Math.floor(Math.random() * authors.length)]
    });
  });

  return prompts.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
};

// Helper functions
const generateRandomTags = (category) => {
  const tagsByCategory = {
    [PROMPT_CATEGORIES.CONTENT_GENERATION]: ['blog', 'article', 'marketing', 'SEO', 'social-media'],
    [PROMPT_CATEGORIES.CUSTOMER_SUPPORT]: ['support', 'help', 'service', 'resolution', 'FAQ'],
    [PROMPT_CATEGORIES.DATA_ANALYSIS]: ['analytics', 'insights', 'reporting', 'metrics', 'trends'],
    [PROMPT_CATEGORIES.CODE_GENERATION]: ['programming', 'development', 'documentation', 'debugging'],
    [PROMPT_CATEGORIES.TRANSLATION]: ['language', 'localization', 'multilingual', 'international'],
    [PROMPT_CATEGORIES.SUMMARIZATION]: ['summary', 'digest', 'brief', 'highlights', 'overview'],
    [PROMPT_CATEGORIES.CLASSIFICATION]: ['categorization', 'sorting', 'labeling', 'organization'],
    [PROMPT_CATEGORIES.CREATIVE_WRITING]: ['story', 'narrative', 'fiction', 'creative', 'imagination'],
    [PROMPT_CATEGORIES.PRODUCT_DESCRIPTION]: ['ecommerce', 'product', 'sales', 'conversion', 'marketing'],
    [PROMPT_CATEGORIES.EMAIL_GENERATION]: ['email', 'campaigns', 'outreach', 'communication', 'engagement']
  };
  
  const categoryTags = tagsByCategory[category] || ['general', 'ai', 'prompt'];
  const numTags = Math.floor(Math.random() * 3) + 2; // 2-4 tags
  return categoryTags.slice(0, numTags);
};

const generateUseCases = (category) => {
  const useCasesByCategory = {
    [PROMPT_CATEGORIES.CONTENT_GENERATION]: ['Blog writing', 'Social media posts', 'Marketing copy', 'Website content'],
    [PROMPT_CATEGORIES.CUSTOMER_SUPPORT]: ['Ticket responses', 'FAQ generation', 'Help articles', 'Live chat'],
    [PROMPT_CATEGORIES.DATA_ANALYSIS]: ['Report generation', 'Trend analysis', 'Performance metrics', 'Data insights'],
    [PROMPT_CATEGORIES.CODE_GENERATION]: ['API documentation', 'Code comments', 'Technical guides', 'README files'],
    [PROMPT_CATEGORIES.TRANSLATION]: ['Website localization', 'Document translation', 'Content adaptation'],
    [PROMPT_CATEGORIES.SUMMARIZATION]: ['Meeting notes', 'Article summaries', 'Research briefs', 'Executive summaries'],
    [PROMPT_CATEGORIES.CLASSIFICATION]: ['Content tagging', 'Support ticket routing', 'Data categorization'],
    [PROMPT_CATEGORIES.CREATIVE_WRITING]: ['Storytelling', 'Creative campaigns', 'Brand narratives', 'Fiction writing'],
    [PROMPT_CATEGORIES.PRODUCT_DESCRIPTION]: ['E-commerce listings', 'Catalog descriptions', 'Product marketing'],
    [PROMPT_CATEGORIES.EMAIL_GENERATION]: ['Newsletter content', 'Campaign emails', 'Automated responses', 'Outreach']
  };
  
  return useCasesByCategory[category] || ['General purpose', 'AI automation'];
};

const extractVariables = (template) => {
  const variableRegex = /{([^}]+)}/g;
  const matches = template.match(variableRegex);
  return matches ? matches.map(match => match.slice(1, -1)) : [];
};

export const AI_PROMPTS_LIST = generateAIPromptData();

// Prompt usage statistics
export const PROMPT_STATS = {
  totalPrompts: AI_PROMPTS_LIST.length,
  activePrompts: AI_PROMPTS_LIST.filter(p => p.status === PROMPT_STATUS.ACTIVE).length,
  draftPrompts: AI_PROMPTS_LIST.filter(p => p.status === PROMPT_STATUS.DRAFT).length,
  testingPrompts: AI_PROMPTS_LIST.filter(p => p.status === PROMPT_STATUS.TESTING).length,
  totalUsage: AI_PROMPTS_LIST.reduce((sum, p) => sum + p.usage_count, 0),
  avgSuccessRate: Math.round(AI_PROMPTS_LIST.reduce((sum, p) => sum + p.success_rate, 0) / AI_PROMPTS_LIST.length),
  avgResponseTime: Math.round(AI_PROMPTS_LIST.reduce((sum, p) => sum + p.avg_response_time, 0) / AI_PROMPTS_LIST.length),
  avgRating: (AI_PROMPTS_LIST.reduce((sum, p) => sum + parseFloat(p.user_rating), 0) / AI_PROMPTS_LIST.length).toFixed(1),
  totalCost: AI_PROMPTS_LIST.reduce((sum, p) => sum + (p.usage_count * parseFloat(p.cost_per_use)), 0).toFixed(2),
  mostUsedCategory: Object.values(PROMPT_CATEGORIES).reduce((a, b) => 
    AI_PROMPTS_LIST.filter(item => item.category === a).length > 
    AI_PROMPTS_LIST.filter(item => item.category === b).length ? a : b
  ),
  uniqueAuthors: [...new Set(AI_PROMPTS_LIST.map(p => p.author))].length
}; 