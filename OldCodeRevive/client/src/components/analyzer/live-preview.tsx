import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { useState } from "react";

interface LivePreviewProps {
  url: string;
}

export default function LivePreview({ url }: LivePreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const getFrameSize = () => {
    switch (viewMode) {
      case "mobile":
        return "w-80 h-96";
      case "tablet":
        return "w-96 h-96";
      default:
        return "w-full h-96";
    }
  };

  return (
    <Card className="shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Live Preview</h3>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("mobile")}
            className="p-2"
            data-testid="button-mobile-view"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "tablet" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("tablet")}
            className="p-2"
            data-testid="button-tablet-view"
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("desktop")}
            className="p-2"
            data-testid="button-desktop-view"
          >
            <Monitor className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-100 h-96 flex items-center justify-center">
        <div className={`${getFrameSize()} bg-white p-4 transition-all duration-300`}>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="h-24 bg-blue-100 rounded"></div>
            <div className="h-24 bg-green-100 rounded"></div>
            <div className="h-24 bg-yellow-100 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="mt-4 text-xs text-gray-500 text-center">
            Preview of {url}
          </div>
        </div>
      </div>
    </Card>
  );
}
