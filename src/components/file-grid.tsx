import { SpellResource } from "@/lib/files";
import { FileCard } from "./file-card";

interface FileGridProps {
  files: SpellResource[];
}

export function FileGrid({ files }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}
