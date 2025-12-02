import type { CreatePageProps } from "..";
import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../../button";

export function CreatePageCover({ children, label }: CreatePageProps) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center mb-6 gap-2">
        <Button variant="link" onClick={() => navigate(-1)} icon={<ArrowLeftIcon className="h-5 w-5" />}></Button>
        <h1 className="text-2xl font-semibold text-gray-800">{label}</h1>
      </div>
      {children}
    </div>
  );
}
