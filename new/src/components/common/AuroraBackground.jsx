/**
 * Fixed full-viewport animated aurora gradient background, sitting behind
 * all content (z-index -10). Combined with a subtle dot/grid overlay for
 * a Vercel/Linear-style depth effect. Pure CSS animation for performance.
 */
export default function AuroraBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      <div className="absolute inset-0 bg-grid bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-aurora-1 blur-3xl animate-aurora" />
      <div className="absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-aurora-2 blur-3xl animate-aurora [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[550px] w-[550px] rounded-full bg-aurora-3 blur-3xl animate-aurora [animation-delay:-12s]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />
    </div>
  );
}
