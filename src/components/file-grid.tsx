import { File } from "@/schema";
import allSpells2024 from '../files/spells-all-2024.json';
import allSpells from '../files/spells-all-new.json';
import phbSpells from '../files/spells-phb.json';
import { FileCard } from "./file-card";

interface FileGridProps {
  files: File[];
}

export function FileGrid({ files }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FileCard file={files[0]} content={JSON.stringify(allSpells)} />
        <FileCard file={files[1]} content={JSON.stringify(allSpells2024)} />
        <FileCard file={files[2]} content={JSON.stringify(phbSpells)} />
    </div>
  );
}
