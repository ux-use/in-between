import { Card, CardContent } from "@/components/ui/card";
import { FileCode, Palette, FileImage } from "lucide-react";
import { SiJavascript } from "react-icons/si";
import type { Extraction } from "@shared/schema";

interface AssetDetectionProps {
  assets?: Extraction["assets"];
}

export default function AssetDetection({ assets }: AssetDetectionProps) {
  const htmlCount = assets?.html?.length || 0;
  const cssCount = assets?.css?.length || 0;
  const jsCount = assets?.js?.length || 0;
  const imageCount = assets?.images?.length || 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-5 h-5 text-primary">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9H21Z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground">Asset Detection</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <FileCode className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <div className="font-semibold text-green-800 dark:text-green-300 text-xl">{htmlCount}</div>
            <div className="text-sm text-green-600 dark:text-green-400">HTML Files</div>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <div className="font-semibold text-blue-800 dark:text-blue-300 text-xl">{cssCount}</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">CSS Files</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <SiJavascript className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <div className="font-semibold text-yellow-800 dark:text-yellow-300 text-xl">{jsCount}</div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400">JS Files</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <FileImage className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <div className="font-semibold text-purple-800 dark:text-purple-300 text-xl">{imageCount}</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Images</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
