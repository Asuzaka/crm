export function FieldErrorText({ message }: { message?: string | null }) {
  if (!message) return;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}
