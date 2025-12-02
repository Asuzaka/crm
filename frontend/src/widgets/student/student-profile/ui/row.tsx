export function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t border-gray-50">
      <dt className="text-sm font-medium text-gray-500 flex items-center">
        <span className="mr-2 text-gray-400">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-all">{value}</dd>
    </div>
  );
}
