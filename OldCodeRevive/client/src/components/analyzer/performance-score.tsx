import { Card, CardContent } from "@/components/ui/card";

interface PerformanceScoreProps {
  score: number;
  loadTime: number;
}

export default function PerformanceScore({ score, loadTime }: PerformanceScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent Performance";
    if (score >= 70) return "Good Performance";
    return "Needs Improvement";
  };

  const circumference = 2 * Math.PI * 15.9155;
  const strokeDasharray = `${(score / 100) * circumference}, ${circumference}`;

  return (
    <Card className="shadow-sm border border-gray-200 p-3">
      <h3 className="text-sm font-medium text-gray-900 mb-2">Performance</h3>
      <div className="flex items-center justify-center mb-2">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path 
              className="text-gray-200" 
              stroke="currentColor" 
              strokeWidth="3" 
              fill="none" 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path 
              className={getScoreColor(score)} 
              stroke="currentColor" 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray={strokeDasharray}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900" data-testid="text-performance-score">
              {score}
            </span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-600">{getScoreLabel(score)}</p>
        <p className="text-xs text-gray-500">{loadTime}ms</p>
      </div>
    </Card>
  );
}
