import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import URLAnalyzer from "@/components/analyzer/url-analyzer";
import AnalysisResults from "@/components/analyzer/analysis-results";
import AssetDownloadCenter from "@/components/downloads/asset-download-center";
import RecentExtractions from "@/components/dashboard/recent-extractions";
import { useState } from "react";
import type { Extraction } from "@shared/schema";

export default function Home() {
  const [currentAnalysis, setCurrentAnalysis] = useState<Extraction | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <URLAnalyzer onAnalysisComplete={setCurrentAnalysis} />
        
        {currentAnalysis && (
          <>
            <AnalysisResults analysis={currentAnalysis} />
            <AssetDownloadCenter analysis={currentAnalysis} />
          </>
        )}
        
        <RecentExtractions />
      </main>
      
      <Footer />
    </div>
  );
}
