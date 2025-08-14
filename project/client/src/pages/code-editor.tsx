import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, FileCode, Eye, Download, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function CodeEditor() {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Preview</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>Start coding...</p>
</body>
</html>`);
  
  const [cssCode, setCssCode] = useState(`body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

p {
    text-align: center;
    font-size: 18px;
}`);
  
  const [jsCode, setJsCode] = useState(`console.log('Hello from JavaScript!');

// Add some interactivity
document.addEventListener('DOMContentLoaded', function() {
    const h1 = document.querySelector('h1');
    if (h1) {
        h1.addEventListener('click', function() {
            this.style.color = this.style.color === 'yellow' ? 'white' : 'yellow';
        });
    }
});`);

  const [previewKey, setPreviewKey] = useState(0);

  const generatePreviewHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
    <style>${cssCode}</style>
</head>
<body>
    ${htmlCode.replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/i, '').replace(/<\/body>[\s\S]*?<\/html>/i, '')}
    <script>${jsCode}</script>
</body>
</html>`;
  };

  const runCode = () => {
    setPreviewKey(prev => prev + 1);
  };

  const downloadCode = () => {
    const html = generatePreviewHtml();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-preview.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FileCode className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Code Editor</h1>
          </div>
          <div className="bg-muted p-1 rounded-lg flex">
            <Link href="/">
              <button 
                className="px-3 py-1 text-sm rounded text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                title="Web Scraper Mode"
              >
                WebScrape
              </button>
            </Link>
            <button 
              className="px-3 py-1 text-sm rounded bg-primary text-white transition-colors"
              title="Code Editor Mode"
            >
              Coder
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Code Editor</h2>
              <div className="flex space-x-2">
                <Button onClick={runCode} size="sm">
                  <Play className="w-4 h-4 mr-1" />
                  Run
                </Button>
                <Button onClick={downloadCode} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>

            <Tabs defaultValue="html" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="space-y-2">
                <Textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Enter your HTML code..."
                />
              </TabsContent>

              <TabsContent value="css" className="space-y-2">
                <Textarea
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Enter your CSS code..."
                />
              </TabsContent>

              <TabsContent value="js" className="space-y-2">
                <Textarea
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Enter your JavaScript code..."
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Live Preview</h2>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-white rounded-lg border-2 border-dashed border-border overflow-hidden">
                  <iframe
                    key={previewKey}
                    srcDoc={generatePreviewHtml()}
                    className="w-full h-full border-0"
                    title="Code Preview"
                    sandbox="allow-scripts allow-modals allow-forms"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}