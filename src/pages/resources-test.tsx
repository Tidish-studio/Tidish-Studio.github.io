import { FileGrid } from "@/components/file-grid";
import { testFiles } from "@/lib/files";
import { Link } from "wouter";

export default function ResourcesTest() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Test Spell Resources</h1>

        <div className="border rounded-lg p-4 mb-12 text-sm text-muted-foreground">
          <strong className="text-foreground">Test builds — not the real downloads.</strong>{" "}
          These files are unreleased and may not import correctly. If you're looking for spells for
          the app, use the{" "}
          <Link href="/spells" className="underline hover:text-primary transition-colors">
            Spells
          </Link>{" "}
          page.
        </div>

        {testFiles.length > 0 ? (
          <FileGrid files={testFiles} />
        ) : (
          <p className="text-center text-muted-foreground">
            No test resources available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
