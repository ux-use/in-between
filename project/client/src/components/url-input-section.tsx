import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Globe, Search, Settings, Clipboard, Trash2 } from "lucide-react";
import type { Extraction } from "@shared/schema";

interface UrlInputSectionProps {
  onExtractionComplete: (extraction: Extraction) => void;
}

export default function UrlInputSection({ onExtractionComplete }: UrlInputSectionProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (url: string) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
      
      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const error = await response.json().catch(() => ({ message: "Analysis failed" }));
          throw new Error(error.message || `HTTP ${response.status}`);
        }
        
        return response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error('Analysis timed out. Please try a simpler website or check your connection.');
        }
        throw error;
      }
    },
    onSuccess: (extraction: Extraction) => {
      onExtractionComplete(extraction);
      toast({
        title: "Analysis Complete",
        description: "Successfully extracted website assets",
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze website",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a website URL to analyze",
        variant: "destructive",
      });
      return;
    }
    analyzeMutation.mutate(url);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      toast({
        title: "URL Pasted",
        description: "URL has been pasted from clipboard",
      });
    } catch (error) {
      toast({
        title: "Paste Failed",
        description: "Unable to access clipboard. Please paste manually.",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setUrl("");
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Website URL</h2>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
          />
          <div className="flex space-x-2">
            <Button
              onClick={handleAnalyze}
              disabled={analyzeMutation.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {analyzeMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handlePaste}
              title="Paste from clipboard"
            >
              <Clipboard className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleClear}
              title="Clear URL"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              title="Advanced Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
