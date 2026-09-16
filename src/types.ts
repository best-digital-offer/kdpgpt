export type BookType = 
  | 'coloring'
  | 'puzzle'
  | 'journal'
  | 'devotional'
  | 'children'
  | 'activity'
  | 'planner'
  | 'printable';

export type TrimSize = '8.5x11' | '6x9' | '8.5x8.5' | '5.5x8.5' | '7x10';
export type PaperType = 'white' | 'cream' | 'color';

export interface BookProject {
  id: string;
  title: string;
  subtitle: string;
  authorName: string;
  bookType: BookType;
  targetNiche: string;
  targetAudience: string;
  trimSize: TrimSize;
  paperType: PaperType;
  hasBleed: boolean;
  pageCount: number;
  spineWidthInches: number;
  coverWidthInches: number;
  coverHeightInches: number;
  primaryColor: string;
  accentColor: string;
  coverPrompt?: string;
  coverImageUrl?: string;
  backCoverBlurb: string;
  aboutAuthor?: string;
  createdAt: string;
  updatedAt: string;
  pages: BookPage[];
  keywords: string[];
  amazonBackendKeywords: string[]; // 7 boxes
  listing: AmazonListing;
  adsKeywords: AmazonAdKeyword[];
  aplusModules: APlusModule[];
  reviewReport?: ContentReviewReport;
}

export type PageType = 
  | 'title'
  | 'copyright'
  | 'dedication'
  | 'table_of_contents'
  | 'coloring'
  | 'wordsearch'
  | 'sudoku'
  | 'maze'
  | 'crossword'
  | 'journal_prompt'
  | 'planner_daily'
  | 'devotional'
  | 'story_text'
  | 'blank'
  | 'solution';

export interface BookPage {
  id: string;
  pageNumber: number;
  type: PageType;
  title: string;
  subtitle?: string;
  content: string;
  promptText?: string;
  svgData?: string;
  puzzleData?: PuzzleData;
  solutionPageNumber?: number;
  isCustomized?: boolean;
}

export interface PuzzleData {
  type: 'wordsearch' | 'sudoku' | 'maze' | 'crossword';
  difficulty: 'easy' | 'medium' | 'hard';
  gridSize?: number;
  grid?: string[][] | number[][];
  words?: string[];
  wordPositions?: { word: string; start: [number, number]; end: [number, number] }[];
  solutionGrid?: string[][] | number[][];
  mazeSvg?: string;
  clues?: { across: { num: number; clue: string; answer: string }[]; down: { num: number; clue: string; answer: string }[] };
}

export interface AmazonListing {
  optimizedTitle: string;
  optimizedSubtitle: string;
  bulletPoints: string[];
  htmlDescription: string;
  suggestedCategories: string[];
  suggestedPriceUSD: number;
  estimatedRoyaltyUSD: number;
  sevenBackendKeywords: string[];
}

export interface AmazonAdKeyword {
  keyword: string;
  matchType: 'Broad' | 'Phrase' | 'Exact';
  suggestedBidUSD: number;
  searchVolume: 'High' | 'Medium' | 'Low';
  relevanceScore: number;
}

export interface APlusModule {
  id: string;
  type: 'company_logo' | 'header_image_text' | 'standard_3_images' | 'comparison_chart';
  headline: string;
  bodyText: string;
  imageStyle?: string;
  points?: string[];
}

export interface NicheAnalysis {
  niche: string;
  bsrScore: number; // e.g. 15,000
  estimatedMonthlySales: number;
  competitionScore: number; // 1-100 (lower is easier)
  demandScore: number; // 1-100
  profitPotential: 'Very High' | 'High' | 'Medium' | 'Low';
  averagePriceUSD: number;
  suggestedSubNiches: string[];
  targetBuyerPersonas: string[];
  topSearchTerms: string[];
  seasonality: string;
  adviceNotes: string;
}

export type SubscriptionTier = 'free' | 'pro' | 'agency';
export type PaymentGateway = 'payu' | 'stripe' | 'paypal';

export interface PayUPaymentParams {
  key: string;
  txnid: string;
  amount: string;
  currency: string;
  amountUSD: number;
  amountINR: number;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  udf1: string;
  udf2: string;
  udf3: string;
  udf4: string;
  udf5: string;
  service_provider: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  plan: SubscriptionTier;
  dailyGenerationsLeft: number;
  maxDailyGenerations: number;
  totalBooksCreated: number;
  memberSince: string;
  payuTxnId?: string;
  stripeCustomerId?: string;
  paypalEmail?: string;
  affiliateCode: string;
  affiliateEarningsUSD: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  expiry: string;
  description: string;
}

export interface SupportTicket {
  id: string;
  userEmail: string;
  subject: string;
  category: 'Billing' | 'Generation' | 'KDP Export' | 'Feature Request';
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  message: string;
}

export interface ContentReviewIssue {
  id: string;
  pageId?: string;
  pageNumber?: number;
  targetType: 'text' | 'puzzle' | 'image' | 'metadata' | 'kdp_policy';
  category: 'grammar' | 'style' | 'clarity' | 'kdp_policy' | 'puzzle_quality' | 'image_bleed';
  severity: 'critical' | 'warning' | 'suggestion';
  title: string;
  description: string;
  ruleCitation?: string;
  originalSnippet?: string;
  suggestedFix: string;
  autoFixable: boolean;
  status: 'open' | 'applied' | 'dismissed';
  appliedFix?: {
    field: 'title' | 'subtitle' | 'page_content' | 'page_title' | 'bullet_points' | 'html_description' | 'back_cover_blurb';
    pageId?: string;
    bulletIndex?: number;
    replacement: string;
  };
}

export interface ContentReviewReport {
  overallScore: number; // 0 - 100
  grammarScore: number;
  clarityScore: number;
  kdpComplianceScore: number;
  styleConsistencyScore: number;
  summary: string;
  issues: ContentReviewIssue[];
  analyzedAt: string;
}

export interface PromptTemplate {
  id: string;
  category: BookType;
  name: string;
  prompt: string;
  model: 'gemini' | 'openai' | 'claude' | 'flux' | 'stable-diffusion';
  active: boolean;
}
