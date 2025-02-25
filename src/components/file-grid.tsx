import { File } from "@/schema";
import allSpells from '../files/spells-all-new.json';
import { FileCard } from "./file-card";

interface FileGridProps {
  files: File[];
}

export function FileGrid({ files }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FileCard file={files[0]} content={JSON.stringify(allSpells)} />
    </div>
  );
}
