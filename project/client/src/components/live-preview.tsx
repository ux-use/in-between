import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Monitor, Tablet, Smartphone, ExternalLink, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

interface LivePreviewProps {
  previewUrl?: string | null;
  extractionId?: string;
}

export default function LivePreview({ previewUrl, extractionId }: LivePreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getFrameClass = () => {
    let baseClass = "";
    switch (viewMode) {
      case "desktop":
        baseClass = "w-full h-full";
        break;
      case "tablet":
        baseClass = "w-3/4 h-full mx-auto";
        break;
      case "mobile":
        baseClass = "w-1/2 h-full mx-auto";
        break;
      default:
        baseClass = "w-full h-full";
    }
    return baseClass;
  };

  const getContainerStyle = () => {
    return {
      transform: `scale(${zoomLevel / 100})`,
      transformOrigin: 'top left',
      transition: 'transform 0.2s ease-in-out'
    };
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Live Preview</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 50}
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="flex items-center px-2 text-sm text-muted-foreground bg-muted rounded">
                {zoomLevel}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 200}
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                title="Refresh Preview"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-border flex items-start justify-center mb-3 overflow-hidden">
          <div 
            style={getContainerStyle()}
            className="w-full h-full flex items-center justify-center"
          >
            {extractionId ? (
              <iframe
                key={`extraction-${extractionId}-${refreshKey}`}
                src={`/api/extractions/${extractionId}/preview`}
                className={`rounded-lg border ${getFrameClass()}`}
                title="Extracted website preview"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : previewUrl ? (
              <iframe
                key={`preview-${previewUrl}-${refreshKey}`}
                src={previewUrl}
                className={`rounded-lg border ${getFrameClass()}`}
                title="Website preview"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No preview available</p>
                <p className="text-sm">Analyze a website to see preview</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("desktop")}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "tablet" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("tablet")}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("mobile")}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
          {previewUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(previewUrl, "_blank")}
              className="text-primary hover:text-primary"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Open Full Preview
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
