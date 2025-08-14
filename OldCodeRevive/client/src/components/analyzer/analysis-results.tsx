import { Card } from "@/components/ui/card";
import LivePreview from "./live-preview";
import PerformanceScore from "./performance-score";
import FrameworkDetection from "./framework-detection";
import MobileResponsiveness from "./mobile-responsiveness";
import type { Extraction } from "@shared/schema";

interface AnalysisResultsProps {
  analysis: Extraction;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* Live Preview Card */}
      <div className="lg:col-span-2">
        <LivePreview url={analysis.url} />
      </div>

      {/* Quick Stats */}
      <div className="space-y-6">
        <PerformanceScore 
          score={analysis.performanceScore || 0}
          loadTime={analysis.loadTime || 0}
        />
        <FrameworkDetection frameworks={analysis.frameworks || []} />
        <MobileResponsiveness 
          isMobileResponsive={analysis.isMobileResponsive || false}
          hasViewportMeta={analysis.hasViewportMeta || false}
        />
      </div>
    </section>
  );
}
