import { deleteStudent } from "@/entities/student";
import { Button, Delete, Modal } from "@/shared/ui";

export function DeleteIncome({ name, id }: { name: string; id: string }) {
  return (
    <Modal>
      <Modal.Open opens={`delete-income-${id}`}>
        <Button variant="destructive" size="sm">
          Remove
        </Button>
      </Modal.Open>
      <Modal.Window name={`delete-income-${id}`}>
        <Delete deleteApi={deleteStudent} name={name} id={id} Mkey="income-list" />
      </Modal.Window>
    </Modal>
  );
}
