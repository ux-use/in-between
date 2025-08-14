import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Check } from "lucide-react";
import type { Extraction } from "@shared/schema";

interface AnalysisResultsProps {
  performance?: Extraction["performance"];
}

export default function AnalysisResults({ performance }: AnalysisResultsProps) {
  if (!performance) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Analysis</h3>
          </div>
          <div className="text-center text-muted-foreground py-4">
            No analysis data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Analysis</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Performance Score</span>
              <span className="text-sm font-semibold text-accent">
                {performance.score}/100
              </span>
            </div>
            <Progress 
              value={performance.score} 
              className="h-2"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Mobile Responsive</span>
              <span className="text-sm font-semibold flex items-center text-accent">
                {performance.mobileResponsive ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Yes
                  </>
                ) : (
                  "No"
                )}
              </span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Total Size</span>
              <span className="text-sm font-semibold text-foreground">
                {formatFileSize(performance.totalSize)}
              </span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Components Found</span>
              <span className="text-sm font-semibold text-foreground">
                {performance.componentsFound}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
