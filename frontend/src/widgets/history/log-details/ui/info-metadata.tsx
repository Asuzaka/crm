export function MetadataViewer({ metadata }: { metadata: Record<string, unknown> }) {
  if (!metadata || Object.keys(metadata).length === 0) return null;

  return (
    <>
      {Object.entries(metadata).map(([key, value]) => (
        <div key={key} className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">{key}</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {typeof value === "object" ? (
              <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(value, null, 2)}
              </pre>
            ) : (
              String(value)
            )}
          </dd>
        </div>
      ))}
    </>
  );
}
