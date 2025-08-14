import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FolderOpen, FileCode, Palette, Download, Eye } from "lucide-react";
import { SiJavascript } from "react-icons/si";
import type { Extraction } from "@shared/schema";

interface AssetListProps {
  assets?: Extraction["assets"];
  extractionId: string;
}

type AssetType = "all" | "html" | "css" | "js" | "images";

export default function AssetList({ assets, extractionId }: AssetListProps) {
  const [activeFilter, setActiveFilter] = useState<AssetType>("all");

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getFilteredAssets = () => {
    if (!assets) return [];
    
    const allAssets = [
      ...(assets.html?.map(asset => ({ ...asset, type: "html" as const })) || []),
      ...(assets.css?.map(asset => ({ ...asset, type: "css" as const })) || []),
      ...(assets.js?.map(asset => ({ ...asset, type: "js" as const })) || []),
      ...(assets.images?.map(asset => ({ ...asset, type: "images" as const })) || []),
    ];

    if (activeFilter === "all") return allAssets;
    return allAssets.filter(asset => asset.type === activeFilter);
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "html":
        return <FileCode className="w-5 h-5 text-blue-500" />;
      case "css":
        return <Palette className="w-5 h-5 text-green-500" />;
      case "js":
        return <SiJavascript className="w-5 h-5 text-yellow-500" />;
      case "images":
        return <div className="w-5 h-5 bg-purple-500 rounded" />;
      default:
        return <div className="w-5 h-5 bg-gray-500 rounded" />;
    }
  };

  const filteredAssets = getFilteredAssets();

  const handleDownload = async (type: string, filename: string) => {
    try {
      const response = await fetch(`/api/extractions/${extractionId}/download/${type}/${filename}`);
      if (!response.ok) throw new Error("Download failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FolderOpen className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Extracted Assets</h3>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
            >
              All
            </Button>
            <Button
              variant={activeFilter === "html" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("html")}
            >
              HTML
            </Button>
            <Button
              variant={activeFilter === "css" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("css")}
            >
              CSS
            </Button>
            <Button
              variant={activeFilter === "js" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("js")}
            >
              JS
            </Button>
            <Button
              variant={activeFilter === "images" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("images")}
            >
              Images
            </Button>
          </div>
        </div>
        <ScrollArea className="h-96">
          <div className="space-y-2">
            {filteredAssets.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No assets found
              </div>
            ) : (
              filteredAssets.map((asset, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  {getAssetIcon(asset.type)}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate text-foreground">{asset.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {asset.path} • {formatFileSize(asset.size)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary"
                      onClick={() => {
                        if ('content' in asset && asset.content) {
                          const blob = new Blob([asset.content], { 
                            type: asset.type === 'html' ? 'text/html' : 
                                  asset.type === 'css' ? 'text/css' : 
                                  'application/javascript' 
                          });
                          const url = URL.createObjectURL(blob);
                          window.open(url, '_blank');
                        }
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(asset.type, asset.name)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
