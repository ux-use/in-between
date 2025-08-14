export interface Framework {
  name: string;
  version?: string;
  confidence: number;
  icon: string;
}

export interface Asset {
  name: string;
  url: string;
  size: number;
  content?: string;
  type?: string;
}

export interface AnalysisResult {
  url: string;
  title?: string;
  description?: string;
  favicon?: string;
  htmlAssets: Asset[];
  cssAssets: Asset[];
  jsAssets: Asset[];
  imageAssets: Asset[];
  fontAssets: Asset[];
  frameworks: Framework[];
  performanceScore: number;
  loadTime: number;
  totalSize: number;
  isMobileResponsive: boolean;
  hasViewportMeta: boolean;
}
