export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b bg-muted/40">
      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
