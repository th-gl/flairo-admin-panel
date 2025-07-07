// Core components
export { default as ServiceTableHead } from "./ServiceTableHead";
export { default as ServiceTableRow } from "./ServiceTableRow";
export { default as HeadingArea } from "./HeadingArea";
export { default as SearchArea } from "./SearchArea";

// Page views
export { 
  ServiceList, 
  ServiceCreate, 
  AIPromptsList, 
  AIPromptsCreate,
  AIPromptsManagement 
} from "./page-view";

// Demo component
export { default as AIPromptsDemo } from "./demo/AIPromptsDemo";

// Request utilities
export * from "./request";

// Re-export with better naming for AI Prompts
export { default as AIPromptsTableHead } from "./ServiceTableHead";
export { default as AIPromptsTableRow } from "./ServiceTableRow";
export { default as AIPromptsHeading } from "./HeadingArea";
export { default as AIPromptsSearch } from "./SearchArea";

// Legacy exports for backward compatibility
export { default as AIOutputQADemo } from "./demo/AIOutputQADemo";
export { default as AIOutputTableHead } from "./ServiceTableHead";
export { default as AIOutputTableRow } from "./ServiceTableRow";
export { default as AIOutputHeading } from "./HeadingArea";
export { default as AIOutputSearch } from "./SearchArea"; 