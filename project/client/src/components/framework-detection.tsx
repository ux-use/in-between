import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Check, X } from "lucide-react";
import { SiReact, SiTailwindcss, SiBootstrap, SiVuedotjs, SiAngular } from "react-icons/si";
import type { Extraction } from "@shared/schema";

interface FrameworkDetectionProps {
  frameworks?: Extraction["frameworks"];
}

const frameworkIcons = {
  React: SiReact,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  Vue: SiVuedotjs,
  Angular: SiAngular,
};

export default function FrameworkDetection({ frameworks = [] }: FrameworkDetectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Layers className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Framework Detection</h3>
        </div>
        <div className="space-y-3">
          {frameworks?.map((framework, index) => {
            const IconComponent = frameworkIcons[framework.name as keyof typeof frameworkIcons];
            
            return (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    {IconComponent ? (
                      <IconComponent className="w-4 h-4 text-primary" />
                    ) : (
                      <div className="w-4 h-4 bg-primary rounded-sm" />
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{framework.name}</span>
                    {framework.version && (
                      <span className="text-sm text-muted-foreground ml-2">
                        v{framework.version}
                      </span>
                    )}
                  </div>
                </div>
                <Badge 
                  variant={framework.detected ? "default" : "secondary"}
                  className="flex items-center space-x-1"
                >
                  {framework.detected ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Detected</span>
                    </>
                  ) : (
                    <>
                      <X className="w-3 h-3" />
                      <span>Not Found</span>
                    </>
                  )}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
