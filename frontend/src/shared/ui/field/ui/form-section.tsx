export interface FormSectionProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormSection({ title, children, className = "" }: FormSectionProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow ${className}`}>
      {title && <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>}
      {children}
    </div>
  );
}
