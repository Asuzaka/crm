import { SearchIcon } from "lucide-react";

interface PanelSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function PanelSearch({ query, setQuery, ...others }: PanelSearchProps) {
  return (
    <div className="relative bg-white rounded-lg shadow">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={query}
        {...others}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-3 py-3 border outline-blue-500 border-none rounded-md placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
    </div>
  );
}
