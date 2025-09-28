const AppFooter = () => {
  const lastUpdate = "2024-01-15 14:30:25";

  return (
    <footer className="border-t border-border bg-card p-4 text-center">
      <p className="text-sm text-muted-foreground">
        Last DB Update: <span className="text-primary">{lastUpdate}</span>
      </p>
    </footer>
  );
};

export default AppFooter;