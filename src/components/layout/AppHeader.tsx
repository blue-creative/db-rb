import { Music } from "lucide-react";

const AppHeader = () => {
  return (
    <header className="border-b border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <Music className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-xl font-bold text-foreground">Music Manager Pro</h1>
          <p className="text-sm text-muted-foreground">v1.0.0</p>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;