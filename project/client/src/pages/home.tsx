import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UrlInputSection from "@/components/url-input-section";
import AssetDetection from "@/components/asset-detection";
import FrameworkDetection from "@/components/framework-detection";
import AssetList from "@/components/asset-list";
import LivePreview from "@/components/live-preview";
import AnalysisResults from "@/components/analysis-results";
import ExportActions from "@/components/export-actions";
import RecentExtractions from "@/components/recent-extractions";
import { Download } from "lucide-react";
import { Link } from "wouter";
import type { Extraction } from "@shared/schema";

export default function Home() {
  const [currentExtraction, setCurrentExtraction] = useState<Extraction | null>(null);

  const { data: recentExtractions } = useQuery({
    queryKey: ["/api/extractions"],
    enabled: true,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Download className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">WebScrape Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-secondary hover:text-primary transition-colors">Dashboard</a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">History</a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">Settings</a>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="bg-muted p-1 rounded-lg flex">
                <button 
                  className="px-3 py-1 text-sm rounded bg-primary text-white transition-colors"
                  title="Web Scraper Mode"
                >
                  WebScrape
                </button>
                <Link href="/code-editor">
                  <button 
                    className="px-3 py-1 text-sm rounded text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                    title="Code Editor Mode"
                  >
                    Coder
                  </button>
                </Link>
              </div>
              <button className="md:hidden">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* URL Input Section */}
        <UrlInputSection onExtractionComplete={setCurrentExtraction} />

        {currentExtraction && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Asset Detection */}
            <div className="lg:col-span-2 space-y-6">
              <AssetDetection assets={currentExtraction.assets} />
              <FrameworkDetection frameworks={currentExtraction.frameworks} />
              <AssetList 
                assets={currentExtraction.assets} 
                extractionId={currentExtraction.id}
              />
            </div>

            {/* Right Column - Preview & Actions */}
            <div className="space-y-6">
              <LivePreview previewUrl={currentExtraction.previewUrl} extractionId={currentExtraction.id} />
              <AnalysisResults performance={currentExtraction.performance} />
              <ExportActions extractionId={currentExtraction.id} />
              <RecentExtractions extractions={recentExtractions as Extraction[] || []} />
            </div>
          </div>
        )}

        {!currentExtraction && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Extract Website Frontend
            </h3>
            <p className="text-muted-foreground">
              Enter a website URL above to analyze and extract all frontend assets
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
