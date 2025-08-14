import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

interface MobileResponsivenessProps {
  isMobileResponsive: boolean;
  hasViewportMeta: boolean;
}

export default function MobileResponsiveness({ 
  isMobileResponsive, 
  hasViewportMeta 
}: MobileResponsivenessProps) {
  return (
    <Card className="shadow-sm border border-gray-200 p-3">
      <h3 className="text-sm font-medium text-gray-900 mb-2">Mobile</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
            isMobileResponsive ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isMobileResponsive ? (
              <CheckCircle className="h-3 w-3 text-green-600" />
            ) : (
              <XCircle className="h-3 w-3 text-red-600" />
            )}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900">
              {isMobileResponsive ? "Responsive" : "Not Responsive"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
            hasViewportMeta ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {hasViewportMeta ? (
              <CheckCircle className="h-3 w-3 text-green-600" />
            ) : (
              <XCircle className="h-3 w-3 text-red-600" />
            )}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900">
              Viewport Meta
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
