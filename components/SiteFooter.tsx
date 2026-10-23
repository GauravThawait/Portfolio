export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-page px-4 py-8 font-mono text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} Gaurav Thawait
      </div>
    </footer>
  );
}
