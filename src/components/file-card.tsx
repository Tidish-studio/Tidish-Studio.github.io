import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { File } from "@/schema";
import { format } from "date-fns";
import { Download, FileIcon } from "lucide-react";
import { useState } from "react";

interface FileCardProps {
  file: File;
  content: string;
}

export function FileCard({ file, content }: FileCardProps) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
  };


  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, content: string) => {
    e.preventDefault();
    try {
      setDownloading(true);
      setProgress(0);

      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(i);
      }

      // Create and download the file
      const blob = new Blob([content], { type: file.type });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileIcon className="h-8 w-8 text-primary" />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-lg truncate">{file.name}</h3>
            <p className="text-sm text-muted-foreground">
              Last updated: {format(new Date(file.lastUpdated), 'MMM d, yyyy h:mm a')}
            </p>
            <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
          </div>
        </div>
        {file.description && (
          <p className="text-sm text-muted-foreground">{file.description}</p>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {downloading ? (
          <Progress value={progress} className="w-full" />
        ) : (
          <Button 
            className="w-full" 
            onClick={(e) => handleDownload(e, content)}
            disabled={downloading}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}