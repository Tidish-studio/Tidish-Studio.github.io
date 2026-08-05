import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SpellResource } from "@/lib/files";
import { Download, FileIcon } from "lucide-react";

interface FileCardProps {
  file: SpellResource;
}

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function FileCard({ file }: FileCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileIcon className="h-8 w-8 text-primary" />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-lg truncate">{file.name}</h3>
            <p className="text-sm text-muted-foreground">
              Last updated: {formatDate(file.lastUpdated)}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{file.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <a href={file.url} download>
            <Download className="mr-2 h-4 w-4" />
            Download
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
