import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import type { Extraction } from "@shared/schema";

interface URLAnalyzerProps {
  onAnalysisComplete: (analysis: Extraction) => void;
}

export default function URLAnalyzer({ onAnalysisComplete }: URLAnalyzerProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const analyzeMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/analyze", { url });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        onAnalysisComplete(data.data);
        queryClient.invalidateQueries({ queryKey: ["/api/extractions"] });
        toast({
          title: "Analysis Complete",
          description: "Website analysis has been completed successfully.",
        });
      }
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the website. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a website URL to analyze.",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(url);
      analyzeMutation.mutate(url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="analyze" className="mb-12">
      <Card className="shadow-sm border border-gray-200 p-8">
        <CardContent className="p-0">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Analyze Website</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Extract and analyze frontend assets, detect frameworks, and get comprehensive insights about any website's technology stack.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </Label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  data-testid="input-url"
                />
              </div>
              <div className="sm:self-end">
                <Button
                  onClick={handleAnalyze}
                  disabled={analyzeMutation.isPending}
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
                  data-testid="button-analyze"
                >
                  <Search className="h-4 w-4" />
                  {analyzeMutation.isPending ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
