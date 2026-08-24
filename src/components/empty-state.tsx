export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed p-12 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
