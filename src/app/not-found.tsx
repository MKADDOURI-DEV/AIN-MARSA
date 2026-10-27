import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-40 text-center">
      <h1 className="text-5xl text-forest-deep">404</h1>
      <p className="mt-4 text-muted-foreground">Cette page est introuvable.</p>
      <Link href="/" className="mt-8 inline-block rounded-sm bg-forest px-6 py-3 text-sm font-semibold text-cream">Accueil</Link>
    </section>
  );
}
