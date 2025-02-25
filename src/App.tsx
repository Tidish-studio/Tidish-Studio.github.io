import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import Resources from "@/pages/resources";
import { Link, Route, Switch } from "wouter";

function Nav() {
  return (
    <nav className="p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link href="/">
            <a className="hover:text-primary transition-colors">Home</a>
          </Link>
          <Link href="/spells">
            <a className="hover:text-primary transition-colors">Spells</a>
          </Link>
          <Link href="/privacy-policy">
            <a className="hover:text-primary transition-colors">Privacy Policy</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/spells" component={Resources} />
        <Route path="/privacy-policy" component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <div className="min-h-screen bg-background text-foreground">
        <ThemeToggle />
        <Router />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;