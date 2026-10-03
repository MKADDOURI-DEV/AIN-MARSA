export function PageHero({ eyebrow, title, sub, image }: { eyebrow?: string; title: string; sub?: string; image?: string }) {
  if (image) {
    return (
      <section className="relative h-[52vh] min-h-[360px] overflow-hidden">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14 text-cream lg:px-8">
          {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
          <h1 className="mt-3 text-5xl md:text-6xl">{title}</h1>
          {sub && <p className="mt-4 max-w-xl opacity-90">{sub}</p>}
        </div>
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-3 text-5xl text-forest-deep md:text-6xl">{title}</h1>
      <span className="rule-gold mt-6" />
      {sub && <p className="mt-6 max-w-2xl text-muted-foreground">{sub}</p>}
    </section>
  );
}
