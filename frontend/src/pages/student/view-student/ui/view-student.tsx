import { useParams } from "react-router";
import { Loader } from "@/shared/ui";
import { useGetStudent } from "@/entities/student";
import { Error } from "@/pages/error";
import { StudentCard, StudentHeader } from "@/widgets/student/student-profile";

export function ViewStudent() {
  const { id } = useParams();
  const { error, data, isPending } = useGetStudent(id!);

  if (!id) return <Error title="No ID" message="No student ID was provided" />;
  if (isPending) return <Loader />;
  if (error) return <Error title="Failed to load student" message={error.message} />;
  if (!data) return null;

  const student = data.data;

  return (
    <div>
      <StudentHeader student={student} />
      <StudentCard student={student} />
    </div>
  );
}
