import { File } from "@/schema";
import allSpells2024 from '../files/older/spells-all-2024.json';
import spells2014 from '../files/older/spells-all-new.json';
import { FileCard } from "./file-card";

interface FileGridProps {
  files: File[];
}

export function FileGrid({ files }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <FileCard file={files[0]} content={JSON.stringify(spells2014)} />
        <FileCard file={files[1]} content={JSON.stringify(allSpells2024)} />
    </div>
  );
}
