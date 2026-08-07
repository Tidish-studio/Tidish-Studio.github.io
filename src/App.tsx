import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import Resources from "@/pages/resources";
import ResourcesTest from "@/pages/resources-test";
import { Link, Route, Router, Switch } from "wouter";

function Nav() {
  return (
    <nav className="p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/spells" className="hover:text-primary transition-colors">
            Spells
          </Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Routes() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/spells" component={Resources} />
        {/* Intentionally absent from Nav — reachable by URL only. See CLAUDE.md. */}
        <Route path="/spells-test" component={ResourcesTest} />
        <Route path="/privacy-policy" component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

// Wouter expects a base with no trailing slash. BASE_URL is "/" when served from the domain root,
// which would otherwise produce protocol-relative hrefs like "//spells".
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <div className="min-h-screen bg-background text-foreground">
        <ThemeToggle />
        <Router base={routerBase}>
          <Routes />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;