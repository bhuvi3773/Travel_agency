import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
      <span className="text-xs uppercase tracking-[0.5em] text-[var(--brand-accent)]">404</span>
      <h1 className="font-serif text-4xl text-[var(--brand-ink)] sm:text-5xl">This route didn&apos;t quite take off.</h1>
      <p className="max-w-xl text-[var(--brand-muted)]">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Head back to the home page or browse our sample packages to start planning.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button href="/">
          Return home
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
        <Button href="/packages" variant="outline">
          Browse packages
        </Button>
        <Button href="/destinations" variant="ghost">
          View destinations
        </Button>
      </div>
      <p className="text-xs text-[var(--brand-muted)]">Meridian Journeys — Demo travel agency template</p>
    </section>
  );
}
