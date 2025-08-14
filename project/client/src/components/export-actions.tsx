import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, Archive, Code, FileText } from "lucide-react";

interface ExportActionsProps {
  extractionId: string;
}

export default function ExportActions({ extractionId }: ExportActionsProps) {
  const { toast } = useToast();

  const handleDownloadAll = async () => {
    try {
      const response = await fetch(`/api/extractions/${extractionId}/download-all`);
      if (!response.ok) throw new Error("Download failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `assets-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download Complete",
        description: "All assets have been downloaded as a ZIP file",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download assets. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportProject = async () => {
    try {
      const response = await fetch(`/api/extractions/${extractionId}/export-project`);
      if (!response.ok) throw new Error("Export failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `project-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Export Complete",
        description: "Project structure exported successfully",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await fetch(`/api/extractions/${extractionId}/report`);
      if (!response.ok) throw new Error("Report generation failed");
      
      const report = await response.json();
      const reportContent = `# ${report.title}

**URL:** ${report.url}  
**Extracted:** ${new Date(report.extractedAt).toLocaleString()}

## Summary
- **Total Assets:** ${report.summary.totalAssets}
- **Frameworks Detected:** ${report.summary.frameworks}
- **Performance Score:** ${report.summary.performanceScore}/100
- **Mobile Responsive:** ${report.summary.mobileResponsive ? 'Yes' : 'No'}

## Assets Found
- HTML Files: ${report.assets?.html?.length || 0}
- CSS Files: ${report.assets?.css?.length || 0}
- JavaScript Files: ${report.assets?.js?.length || 0}
- Images: ${report.assets?.images?.length || 0}

## Framework Detection
${report.frameworks?.map((f: any) => `- ${f.name} ${f.version ? `v${f.version}` : ''}: ${f.detected ? '✓ Detected' : '✗ Not Found'}`).join('\n') || 'None detected'}

## Performance Analysis
- **Score:** ${report.performance?.score || 0}/100
- **Total Size:** ${report.performance?.totalSize ? Math.round(report.performance.totalSize / 1024 / 1024 * 100) / 100 + 'MB' : 'Unknown'}
- **Components Found:** ${report.performance?.componentsFound || 0}
- **Mobile Responsive:** ${report.performance?.mobileResponsive ? 'Yes' : 'No'}
`;

      const blob = new Blob([reportContent], { type: 'text/markdown' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analysis-report-${Date.now()}.md`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Report Generated",
        description: "Analysis report downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Report Failed",
        description: "Unable to generate report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Download className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Export</h3>
        </div>
        <div className="space-y-3">
          <Button
            onClick={handleDownloadAll}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Archive className="w-4 h-4 mr-2" />
            Download All Assets
          </Button>
          <Button
            variant="outline"
            onClick={handleExportProject}
            className="w-full"
          >
            <Code className="w-4 h-4 mr-2" />
            Export as Project
          </Button>
          <Button
            variant="outline"
            onClick={handleGenerateReport}
            className="w-full"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
