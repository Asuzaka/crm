export const BUTTON_BASE =
  "cursor-pointer inline-flex items-center justify-center border border-transparent rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

export const BUTTON_VARIANTS: Record<string, string> = {
  primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-70",
  destructive: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:opacity-70",
  outline: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 shadow-sm",
  link: "text-blue-600 hover:text-blue-800 underline border-none shadow-none",
  icon: "text-blue-600 hover:text-blue-800 border-none shadow-none p-2",
  text: "text-blue-600 hover:text-blue-800",
};

export const BUTTON_SIZES: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

export const TAB_BASE = "px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-150";
export const TAB_ACTIVE = "border-blue-500 text-blue-600";
export const TAB_INACTIVE = "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300";
