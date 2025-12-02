interface PanelHeaderProps {
  title: string;
  children: React.ReactNode;
}

export function PanelHeader({ title, children }: PanelHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      {children}
    </header>
  );
}
