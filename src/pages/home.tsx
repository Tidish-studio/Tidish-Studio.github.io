import { Button } from "@/components/ui/button";
import { GooglePlayButton } from "react-mobile-app-button";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();
  const APKUrl = "https://play.google.com/store/apps/details?id=com.tidishstudio.spellbook";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className=" relative py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            DnD Spells 5e
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Enhance your D&D experience with the ultimate spell management app
          </p>
          <div className="flex flex-col items-center gap-8">
          
          <GooglePlayButton
            url={APKUrl}
            theme={"dark"}
            className="w-full"
      />
        <Button
            size="lg"
            onClick={() => navigate("/spells")}
          >
            Browse Spells
          </Button>
      </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Enhance Your Spellcasting</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Complete Compendium</h3>
              <p className="text-muted-foreground">Access detailed spell descriptions and casting requirements</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Quick Reference</h3>
              <p className="text-muted-foreground">Find and filter spells instantly during your gaming sessions</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Spell Management</h3>
              <p className="text-muted-foreground">Organize spells by level, school, and character class</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}