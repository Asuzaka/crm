import { deleteStudent } from "@/entities/student";
import { Button, Delete, Modal } from "@/shared/ui";

export function DeleteStudent({ name, id }: { name: string; id: string }) {
  return (
    <Modal>
      <Modal.Open opens={`delete-student-${id}`}>
        <Button variant="destructive" size="sm">
          Remove
        </Button>
      </Modal.Open>
      <Modal.Window name={`delete-student-${id}`}>
        <Delete deleteApi={deleteStudent} name={name} id={id} Mkey="students" />
      </Modal.Window>
    </Modal>
  );
}
