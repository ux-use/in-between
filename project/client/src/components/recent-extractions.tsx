import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, Globe, Code } from "lucide-react";
import { Link } from "wouter";
import type { Extraction } from "@shared/schema";

interface RecentExtractionsProps {
  extractions: Extraction[];
}

export default function RecentExtractions({ extractions }: RecentExtractionsProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return 'Less than an hour ago';
    }
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Recent</h3>
          </div>
          <Link href="/code-editor">
            <Button variant="outline" size="sm">
              <Code className="w-4 h-4 mr-2" />
              Code Editor
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {extractions.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              No recent extractions
            </div>
          ) : (
            extractions.slice(0, 5).map((extraction) => (
              <div
                key={extraction.id}
                className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate text-foreground">
                    {extraction.title || getDomain(extraction.url)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatTimeAgo(extraction.createdAt)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
