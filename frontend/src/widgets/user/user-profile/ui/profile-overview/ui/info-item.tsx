export type InfoItemProps = {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
};

export function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500 flex items-center">
        <Icon className="h-4 w-4 mr-2" />
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}
