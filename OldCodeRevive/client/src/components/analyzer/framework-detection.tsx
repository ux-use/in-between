import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Framework {
  name: string;
  version?: string;
  confidence: number;
  icon: string;
}

interface FrameworkDetectionProps {
  frameworks: Framework[];
}

export default function FrameworkDetection({ frameworks }: FrameworkDetectionProps) {
  return (
    <Card className="shadow-sm border border-gray-200 p-3">
      <h3 className="text-sm font-medium text-gray-900 mb-2">Frameworks</h3>
      <div className="space-y-1">
        {frameworks.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-2">None detected</p>
        ) : (
          frameworks.map((framework, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between px-2 py-1 bg-gray-50 rounded text-xs"
              data-testid={`framework-${framework.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center gap-1">
                <i className={`${framework.icon} text-blue-500 text-xs`}></i>
                <span className="font-medium">{framework.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs h-4 px-1">
                {framework.version || `${framework.confidence}%`}
              </Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
