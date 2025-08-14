import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Asset {
  name: string;
  url: string;
  size: number;
}

interface AssetCategoryProps {
  title: string;
  count: number;
  icon: string;
  iconColor: string;
  bgColor: string;
  assets: Asset[];
  testId: string;
}

export default function AssetCategory({
  title,
  count,
  icon,
  iconColor,
  bgColor,
  assets,
  testId
}: AssetCategoryProps) {
  const handleDownloadAsset = (asset: Asset) => {
    // TODO: Implement individual asset download
    console.log("Downloading asset:", asset.name);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4" data-testid={testId}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
          <i className={`${icon} ${iconColor}`}></i>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500" data-testid={`${testId}-count`}>
            {count} files
          </p>
        </div>
      </div>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {assets.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No {title.toLowerCase()} files found</p>
        ) : (
          assets.slice(0, 5).map((asset, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
              data-testid={`${testId}-item-${index}`}
            >
              <div className="flex-1 min-w-0">
                <span className="truncate block" title={asset.name}>
                  {asset.name}
                </span>
                <span className="text-xs text-gray-500">
                  {formatFileSize(asset.size)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownloadAsset(asset)}
                className="text-gray-400 hover:text-primary p-1 h-auto"
                data-testid={`${testId}-download-${index}`}
              >
                <Download className="h-3 w-3" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
