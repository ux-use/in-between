import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Code } from "lucide-react";
import AssetCategory from "./asset-category";
import type { Extraction } from "@shared/schema";

interface AssetDownloadCenterProps {
  analysis: Extraction;
}

export default function AssetDownloadCenter({ analysis }: AssetDownloadCenterProps) {
  const handleDownloadAll = () => {
    // TODO: Implement ZIP download functionality
    console.log("Downloading all assets as ZIP");
  };

  const handleExportCode = () => {
    // TODO: Implement code export functionality
    console.log("Exporting code structure");
  };

  return (
    <section id="downloads" className="mb-12">
      <Card className="shadow-sm border border-gray-200 p-8">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Download Center</h2>
              <p className="text-gray-600">Organized assets ready for developer use</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <Button
                onClick={handleDownloadAll}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                data-testid="button-download-all"
              >
                <Download className="h-4 w-4" />
                Download All (ZIP)
              </Button>
              <Button
                variant="outline"
                onClick={handleExportCode}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                data-testid="button-export-code"
              >
                <Code className="h-4 w-4" />
                Export Code
              </Button>
            </div>
          </div>

          {/* Asset Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <AssetCategory
              title="HTML"
              count={analysis.htmlAssets?.length || 0}
              icon="fab fa-html5"
              iconColor="text-orange-600"
              bgColor="bg-orange-100"
              assets={analysis.htmlAssets || []}
              testId="html-assets"
            />
            
            <AssetCategory
              title="CSS"
              count={analysis.cssAssets?.length || 0}
              icon="fab fa-css3-alt"
              iconColor="text-blue-600"
              bgColor="bg-blue-100"
              assets={analysis.cssAssets || []}
              testId="css-assets"
            />
            
            <AssetCategory
              title="JavaScript"
              count={analysis.jsAssets?.length || 0}
              icon="fab fa-js-square"
              iconColor="text-yellow-600"
              bgColor="bg-yellow-100"
              assets={analysis.jsAssets || []}
              testId="js-assets"
            />
            
            <AssetCategory
              title="Images"
              count={analysis.imageAssets?.length || 0}
              icon="fas fa-images"
              iconColor="text-green-600"
              bgColor="bg-green-100"
              assets={analysis.imageAssets || []}
              testId="image-assets"
            />
            
            <AssetCategory
              title="Fonts"
              count={analysis.fontAssets?.length || 0}
              icon="fas fa-font"
              iconColor="text-purple-600"
              bgColor="bg-purple-100"
              assets={analysis.fontAssets || []}
              testId="font-assets"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
