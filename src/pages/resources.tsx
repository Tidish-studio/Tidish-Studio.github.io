import { FileGrid } from "@/components/file-grid";
import { files } from "@/lib/files";

export default function Resources() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Spell Resources</h1>
        <p className="text-center text-muted-foreground mb-12">
          Download additional spells to enhance your D&D spellcasting experience
        </p>
        
        {files.length > 0 ? (
          <FileGrid files={files} />
        ) : (
          <p className="text-center text-muted-foreground">
            No resources available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
