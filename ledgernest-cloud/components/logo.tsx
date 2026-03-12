export function LedgerNestLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="LedgerNest logo">
      <rect width="120" height="120" rx="24" fill="#102A43" />
      <path d="M26 28v64h20V48h28V28H26z" fill="#fff" />
      <path d="M44 92V28h20l30 42V28h20v64H94L64 50v42H44z" fill="#118C6A" />
    </svg>
  );
}
