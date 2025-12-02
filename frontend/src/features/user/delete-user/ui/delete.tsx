import { deleteUsers } from "../../../../entities/user";
import { Button, Delete, Modal } from "@/shared/ui";

export function DeleteUser({ name, id }: { name: string; id: string }) {
  return (
    <Modal>
      <Modal.Open opens={`delete-user-${id}`}>
        <Button variant="destructive" size="sm">
          Remove
        </Button>
      </Modal.Open>
      <Modal.Window name={`delete-user-${id}`}>
        <Delete deleteApi={deleteUsers} name={name} id={id} Mkey="users" />
      </Modal.Window>
    </Modal>
  );
}
