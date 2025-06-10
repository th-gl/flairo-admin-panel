// AI Output Types and Categories
export const AI_OUTPUT_TYPES = {
  TEXT_GENERATION: 'Text Generation',
  IMAGE_ANALYSIS: 'Image Analysis',
  CONTENT_MODERATION: 'Content Moderation',
  TRANSLATION: 'Translation',
  SENTIMENT_ANALYSIS: 'Sentiment Analysis',
  CLASSIFICATION: 'Classification',
  SUMMARIZATION: 'Summarization',
  CODE_GENERATION: 'Code Generation',
  QUESTION_ANSWERING: 'Question Answering',
  ENTITY_EXTRACTION: 'Entity Extraction'
};

export const OUTPUT_STATUS = {
  SUCCESS: 'Success',
  PARTIAL_SUCCESS: 'Partial Success',
  ERROR: 'Error',
  TIMEOUT: 'Timeout',
  PROCESSING: 'Processing',
  QUEUED: 'Queued'
};

export const AI_MODELS = {
  GPT4: 'GPT-4',
  GPT35: 'GPT-3.5',
  CLAUDE: 'Claude',
  LLAMA: 'LLaMA',
  BERT: 'BERT',
  VISION_AI: 'Vision AI',
  CUSTOM_MODEL: 'Custom Model'
};

export const CONFIDENCE_LEVELS = {
  VERY_HIGH: 'Very High',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
  VERY_LOW: 'Very Low'
};

// Generate realistic AI output data
const generateAIOutputData = () => {
  const outputs = [];
  const deviceIds = [
    'device_001', 'device_002', 'device_003', 'device_004',
    'device_005', 'device_006', 'device_007', 'device_008', 
    'device_009', 'device_010', 'device_011', 'device_012'
  ];

  const users = [
    'Zachary Gomez', 'Amanda Montgomery', 'Lester Holland', 'Max Allison', 
    'Richard Gregory', 'Clifford Caldwell', 'Sarah Johnson', 'Michael Chen',
    'Emily Davis', 'David Wilson', 'Lisa Anderson', 'James Thompson'
  ];
  
  const prompts = [
    'Generate a product description for a new smartphone',
    'Analyze customer sentiment from review data',
    'Translate this document to Spanish',
    'Classify support tickets by priority',
    'Summarize quarterly sales report',
    'Generate code for user authentication',
    'Extract entities from customer feedback',
    'Moderate user-generated content',
    'Answer questions about product features',
    'Analyze image for quality control'
  ];

  const sampleOutputs = [
    'The new iPhone 15 Pro Max features advanced camera technology...',
    'Overall sentiment: Positive (85% confidence). Key themes: reliability, performance...',
    'El nuevo smartphone cuenta con características avanzadas...',
    'High Priority: Payment issues, login problems. Medium Priority: Feature requests...',
    'Q3 sales increased by 23% compared to Q2, with mobile leading growth...',
    'function authenticateUser(username, password) { return jwt.sign({user: username}...',
    'Entities found: [Product: iPhone, Location: California, Date: 2024-01-15]...',
    'Content flagged: 2 inappropriate images, 1 spam text. Overall score: Safe',
    'The product supports wireless charging up to 15W and has IP68 rating...',
    'Image analysis: No defects detected. Quality score: 94/100'
  ];

  for (let i = 0; i < 75; i++) {
    const selectedDeviceId = deviceIds[Math.floor(Math.random() * deviceIds.length)];
    const selectedUser = users[Math.floor(Math.random() * users.length)];
    const outputType = Object.values(AI_OUTPUT_TYPES)[Math.floor(Math.random() * Object.values(AI_OUTPUT_TYPES).length)];
    const status = Object.values(OUTPUT_STATUS)[Math.floor(Math.random() * Object.values(OUTPUT_STATUS).length)];
    const model = Object.values(AI_MODELS)[Math.floor(Math.random() * Object.values(AI_MODELS).length)];
    const confidence = Object.values(CONFIDENCE_LEVELS)[Math.floor(Math.random() * Object.values(CONFIDENCE_LEVELS).length)];
    
    // Generate timestamps within last 7 days
    const baseTime = new Date();
    const randomDays = Math.floor(Math.random() * 7);
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    
    const timestamp = new Date(baseTime.getTime() - (randomDays * 24 * 60 * 60 * 1000) - (randomHours * 60 * 60 * 1000) - (randomMinutes * 60 * 1000));
    
    const processingTime = Math.floor(Math.random() * 5000) + 200; // 200ms to 5.2s
    const tokenCount = Math.floor(Math.random() * 2000) + 50;
    const confidenceScore = Math.floor(Math.random() * 100);
    
    outputs.push({
      id: `ai_output_${i + 1}`,
      user_id: `user_${Math.floor(Math.random() * 100) + 1}`,
      user_name: selectedUser,
      user_email: `${selectedUser.toLowerCase().replace(' ', '.')}@company.com`,
      device_id: selectedDeviceId,
      prompt: prompts[Math.floor(Math.random() * prompts.length)],
      output_type: outputType,
      ai_model: model,
      input_text: prompts[Math.floor(Math.random() * prompts.length)],
      output_text: sampleOutputs[Math.floor(Math.random() * sampleOutputs.length)],
      status: status,
      confidence_level: confidence,
      confidence_score: confidenceScore,
      processing_time_ms: processingTime,
      token_count: tokenCount,
      timestamp: timestamp.toISOString(),
      created_at: timestamp.toISOString(),
      
      // QA specific fields
      qa_reviewed: Math.random() > 0.7, // 30% reviewed
      qa_reviewer: Math.random() > 0.5 ? 'QA Team' : null,
      qa_rating: Math.floor(Math.random() * 5) + 1, // 1-5 rating
      qa_notes: Math.random() > 0.6 ? 'Output quality meets expectations' : '',
      
      // Error details for failed outputs
      error_message: status === OUTPUT_STATUS.ERROR ? 'Model timeout due to high load' : null,
      error_code: status === OUTPUT_STATUS.ERROR ? `ERR_${Math.floor(Math.random() * 999) + 100}` : null,
      
      // Performance metrics
      cost_usd: (Math.random() * 0.50).toFixed(4),
      api_endpoint: `/api/v1/${outputType.toLowerCase().replace(' ', '-')}`,
      request_id: `req_${Math.random().toString(36).substr(2, 9)}`,
      
      // Input/Output metadata
      input_length: Math.floor(Math.random() * 1000) + 50,
      output_length: Math.floor(Math.random() * 2000) + 100,
      language_detected: ['en', 'es', 'fr', 'de', 'it'][Math.floor(Math.random() * 5)],
      
      // Safety and moderation scores
      safety_score: Math.floor(Math.random() * 100) + 1,
      toxicity_score: Math.floor(Math.random() * 20), // Lower is better
      bias_score: Math.floor(Math.random() * 30),
      
      // Model performance indicators
      perplexity: (Math.random() * 50 + 10).toFixed(2),
      bleu_score: status === OUTPUT_STATUS.SUCCESS ? (Math.random() * 0.5 + 0.5).toFixed(3) : null,
      
      // User session info
      session_id: `sess_${Math.random().toString(36).substr(2, 8)}`,
      ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      user_agent: ['Chrome/120.0', 'Firefox/119.0', 'Safari/17.0', 'Edge/119.0'][Math.floor(Math.random() * 4)],
      
      // Additional QA metadata
      flagged_for_review: Math.random() > 0.9, // 10% flagged
      human_feedback: Math.random() > 0.8 ? 'Helpful response' : null,
      improvement_suggestions: Math.random() > 0.85 ? 'Could be more concise' : null
    });
  }
  
  return outputs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const AI_OUTPUT_LIST = generateAIOutputData();

// Real-time outputs for demo
export const REALTIME_OUTPUTS = [
  {
    id: 'rt_ai_1',
    user_name: 'John Doe',
    device_id: 'device_001',
    output_type: AI_OUTPUT_TYPES.TEXT_GENERATION,
    status: OUTPUT_STATUS.PROCESSING,
    timestamp: new Date().toISOString(),
    ai_model: AI_MODELS.GPT4
  },
  {
    id: 'rt_ai_2', 
    user_name: 'Jane Smith',
    device_id: 'device_002',
    output_type: AI_OUTPUT_TYPES.IMAGE_ANALYSIS,
    status: OUTPUT_STATUS.SUCCESS,
    timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    ai_model: AI_MODELS.VISION_AI
  }
];

// QA Statistics
export const QA_STATS = {
  totalOutputs: AI_OUTPUT_LIST.length,
  successRate: Math.round((AI_OUTPUT_LIST.filter(o => o.status === OUTPUT_STATUS.SUCCESS).length / AI_OUTPUT_LIST.length) * 100),
  avgProcessingTime: Math.round(AI_OUTPUT_LIST.reduce((sum, o) => sum + o.processing_time_ms, 0) / AI_OUTPUT_LIST.length),
  avgConfidenceScore: Math.round(AI_OUTPUT_LIST.reduce((sum, o) => sum + o.confidence_score, 0) / AI_OUTPUT_LIST.length),
  qaReviewedCount: AI_OUTPUT_LIST.filter(o => o.qa_reviewed).length,
  flaggedForReview: AI_OUTPUT_LIST.filter(o => o.flagged_for_review).length,
  avgQaRating: (AI_OUTPUT_LIST.filter(o => o.qa_rating).reduce((sum, o) => sum + o.qa_rating, 0) / AI_OUTPUT_LIST.filter(o => o.qa_rating).length).toFixed(1),
  totalCost: AI_OUTPUT_LIST.reduce((sum, o) => sum + parseFloat(o.cost_usd), 0).toFixed(2),
  uniqueUsers: [...new Set(AI_OUTPUT_LIST.map(o => o.user_name))].length,
  uniqueDevices: [...new Set(AI_OUTPUT_LIST.map(o => o.device_id))].length,
  mostUsedModel: Object.values(AI_MODELS).reduce((a, b) => 
    AI_OUTPUT_LIST.filter(item => item.ai_model === a).length > 
    AI_OUTPUT_LIST.filter(item => item.ai_model === b).length ? a : b
  )
}; 