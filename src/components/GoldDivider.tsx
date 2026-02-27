export function GoldDivider() {
  return (
    <div className="relative flex items-center justify-center gap-4 py-10" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-herb-gold/40" />
      <span className="relative text-herb-gold/60 text-sm">
        ✦
        <span className="absolute inset-0 blur-md bg-herb-gold/20 rounded-full" />
      </span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-herb-gold/40" />
    </div>
  );
}
