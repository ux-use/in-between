import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Eye, Download, Trash2, History } from "lucide-react";
import type { Extraction } from "@shared/schema";

export default function RecentExtractions() {
  const { data: extractions, isLoading } = useQuery<{ success: boolean; data: Extraction[] }>({
    queryKey: ["/api/extractions"],
  });

  const handleView = (extraction: Extraction) => {
    console.log("Viewing extraction:", extraction.id);
  };

  const handleDownload = (extraction: Extraction) => {
    console.log("Downloading extraction:", extraction.id);
  };

  const handleDelete = (extraction: Extraction) => {
    console.log("Deleting extraction:", extraction.id);
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const getTotalAssets = (extraction: Extraction) => {
    return (
      (extraction.htmlAssets?.length || 0) +
      (extraction.cssAssets?.length || 0) +
      (extraction.jsAssets?.length || 0) +
      (extraction.imageAssets?.length || 0) +
      (extraction.fontAssets?.length || 0)
    );
  };

  if (isLoading) {
    return (
      <section id="dashboard" className="mb-12">
        <Card className="shadow-sm border border-gray-200 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    );
  }

  const extractionsData = extractions?.data || [];

  return (
    <section id="dashboard" className="mb-12">
      <Card className="shadow-sm border border-gray-200 p-8">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Extractions</h2>
              <p className="text-gray-600">Your analysis history and saved results</p>
            </div>
            <Button
              variant="outline"
              className="mt-4 sm:mt-0 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              data-testid="button-view-all"
            >
              <History className="h-4 w-4" />
              View All
            </Button>
          </div>

          {extractionsData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No extractions found</p>
              <p className="text-sm text-gray-400">Analyze a website to see your results here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="table-extractions">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Website</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Frameworks</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Assets</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {extractionsData.map((extraction) => (
                    <tr 
                      key={extraction.id} 
                      className="border-b border-gray-100 hover:bg-gray-50"
                      data-testid={`row-extraction-${extraction.id}`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={extraction.favicon || "/placeholder-favicon.ico"} 
                            alt="Website favicon" 
                            className="w-8 h-8 rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder-favicon.ico";
                            }}
                          />
                          <div>
                            <p className="font-medium text-gray-900" data-testid={`text-url-${extraction.id}`}>
                              {new URL(extraction.url).hostname}
                            </p>
                            <p className="text-sm text-gray-500">
                              {extraction.title || "Website Analysis"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1 flex-wrap">
                          {extraction.frameworks?.slice(0, 2).map((framework, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="text-xs"
                              data-testid={`badge-framework-${framework.name.toLowerCase()}`}
                            >
                              {framework.name}
                            </Badge>
                          ))}
                          {(extraction.frameworks?.length || 0) > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{(extraction.frameworks?.length || 0) - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600" data-testid={`text-assets-${extraction.id}`}>
                          {getTotalAssets(extraction)} files
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                (extraction.performanceScore || 0) >= 90 
                                  ? 'bg-green-500' 
                                  : (extraction.performanceScore || 0) >= 70 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${extraction.performanceScore || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600" data-testid={`text-score-${extraction.id}`}>
                            {extraction.performanceScore || 0}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">
                          {formatTimeAgo(extraction.createdAt || new Date().toISOString())}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(extraction)}
                            className="p-1 text-gray-400 hover:text-primary h-auto"
                            title="View Details"
                            data-testid={`button-view-${extraction.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(extraction)}
                            className="p-1 text-gray-400 hover:text-primary h-auto"
                            title="Download"
                            data-testid={`button-download-${extraction.id}`}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(extraction)}
                            className="p-1 text-gray-400 hover:text-red-500 h-auto"
                            title="Delete"
                            data-testid={`button-delete-${extraction.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
